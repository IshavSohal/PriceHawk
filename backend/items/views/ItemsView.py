from items.serializers.Items import ItemSerializer
from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView, UpdateAPIView, GenericAPIView
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from items.models import Item, Price
from items.services.scraper import extract_price
from rest_framework import views
from rest_framework.exceptions import PermissionDenied
from itertools import chain
from datetime import datetime


class CreateItemsView(CreateAPIView):
    """
    Handles post request for creating
    a new item for the user.
    """
    serializer_class = ItemSerializer
    permission_classes = [permissions.AllowAny]


#UI in dropdown above vendors
# price   date     most recently updated (user input:date)


class SortItemVendorsByPriceOrDate(ListAPIView):
    serializer_class = ItemSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        
        user = self.request.user
        item_name = self.request.POST.get('item_name', "")
        type = self.request.POST.get('type', "")
        order = self.request.POST.get('order', "")
        
        if user.is_anonymous:
            guest_id = self.request.POST.get('guest_id', "")
                
            if type == "price":
                if order == "+":
                    return Item.objects.filter(name=item_name, guest_session=guest_id).order_by('price')
                elif order == "-":
                    return Item.objects.filter(name=item_name, guest_session=guest_id).order_by('-price')
                
            elif type == "date":
                if order == "+":
                    return Item.objects.filter(name=item_name, guest_session=guest_id).order_by('created')
                elif order == "-":
                    return Item.objects.filter(name=item_name, guest_session=guest_id).order_by('-created')
        
        if type == "price":
            if order == "+":
                return Item.objects.filter(name=item_name, user=user).order_by('price')
            elif order == "-":
                return Item.objects.filter(name=item_name, user=user).order_by('-price')
                
        elif type == "date":
            if order == "+":
                return Item.objects.filter(name=item_name, user=user).order_by('created')
            elif order == "-":
                return Item.objects.filter(name=item_name, user=user).order_by('-created')

        #return empty queryset if any errors
        return Item.objects.none()

"""
    Most recently updated items' price.
    returns all vendors of an item (items with same name) that have
    had a price change after a given date (inputted in frontend by user)
"""
class SortItemVendorsMRU(ListAPIView):
    serializer_class = ItemSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        
        user = self.request.user
        
        #must have format "2014-04-07"
        date = self.request.POST.get('date', "")
        date = datetime.strptime(date, "%Y-%m-%d").date()
        
        item_name = self.request.POST.get('item_name', "")
        
        vendors = Item.objects.none()
        
        if user.is_anonymous:
            guest_id = self.request.POST.get('guest_id', "")
            vendors = Item.objects.filter(guest_session=guest_id, name=item_name)
        else:
            vendors = Item.objects.filter(user=user, name=item_name)
        
        result_ids = []
        
        for v in vendors:
            #check all prices
            #if theres a price with date > date, add it to result queryset
        
            for p in v.Prices.all():
                
                if(p.date.date()) >= date:
                    result_ids += [v.pk]
                    break
        
        #to show the lowest price (at the top)
        #among all other recently updated vendors
        #(recently updated: updated after given date)
        result = Item.objects.filter(pk__in=result_ids).order_by('price')
        
        return result


class GetItemsView(views.APIView):

    def get(self, request):
        user = request.user
        is_guest = False
        
        items = Item.objects.none()
        gid = ""
        
        if user.is_anonymous:
            is_guest = True
            gid = request.POST.get('guest_id', "")
            
            items = Item.objects.filter(guest_session=gid).distinct('name')
            
            if not items:
                return Response({"UNAUTHORIZED": "invalid guest id on unauthenticated request"},status=401)
        else:
            items = Item.objects.filter(user=user).distinct('name')
            
            #return empty set if user has no items
            if not items:
                serializer = ItemSerializer(items, many=True)
                return Response(serializer.data)
    
        result = []
        
        for item in items:
            #get all vendors for the item
            vendors = Item.objects.none()
            if is_guest:
                vendors = Item.objects.filter(guest_session=gid, name=item.name).values('vendor_name', 'id', 'price', 'url', 'created')
            else:
                vendors = Item.objects.filter(user=user, name=item.name).values('vendor_name', 'id', 'price', 'url', 'created')
        
            item_with_vendors = [{item.name: vendors}]
            result += item_with_vendors
        
        return Response(result)


class DeleteItemView(DestroyAPIView):
    """
    Handles delete request
    to delete a user's item
    """
    permission_classes = [IsAuthenticated]

    def get_object(self):
        
        item = get_object_or_404(Item, pk=self.kwargs['item_id'])
        if item.guest_session:
            raise PermissionDenied({"FORBIDDEN": "tried to delete a guest user's item"})
            
        return item


class DeleteGuestItemView(DestroyAPIView):
    """
    Handles delete request
    to delete a guest user's item
    """
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        return Item.objects.filter(guest_session=self.kwargs['guest_id'], pk=self.kwargs['item_id'])


class UpdateItemView(UpdateAPIView):
    """
    Handles patch request
    to update a user's item
    """
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Item, id=self.kwargs['item_id'])


class UpdateGuestItemView(UpdateAPIView):
    """
    Handles patch request
    to update a guest user's item
    """
    serializer_class = ItemSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        return get_object_or_404(Item, guest_session=self.kwargs['guest_id'], id=self.kwargs['item_id'])


class RefreshItemView(GenericAPIView):
    """
    Handles refreshing an item's price.
    """
    queryset = Item.objects.all()
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        item = self.get_object()
        price = extract_price(item.url, item.price_html)
        if not price:
            return Response("Error", status=400)
        item.price = price
        item.save()
        Price.objects.create(item=item, value=price)
        return Response({'price': price})


class RefreshGuestItemView(GenericAPIView):
    """
    Handles refreshing an item's price.
    """
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Item.objects.filter(guest_session=self.kwargs['guest_id'])

    def post(self, request, *args, **kwargs):
        item = self.get_object()
        price = extract_price(item.url, item.price_html)
        if not price:
            return Response("Error", status=400)
        item.price = price
        item.save()
        Price.objects.create(item=item, value=price)
        return Response({'price': price})
