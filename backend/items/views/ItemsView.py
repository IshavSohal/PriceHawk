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
from items.services.notifier import check_updated
from django.shortcuts import render



class CreateItemsView(CreateAPIView):
    """
    Handles post request for creating
    a new item for the user.
    """
    serializer_class = ItemSerializer
    permission_classes = [permissions.AllowAny]


class GetItemsView(views.APIView):
   
    def post(self, request):
        user = request.user
        is_guest = False
        
        items = Item.objects.none()
        gid = ""
        
        if user.is_anonymous:
            is_guest = True
            gid = request.data.get('guest_id', "")
            
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
                vendors = Item.objects.filter(guest_session=gid, name=item.name).values('vendor_name', 'id', 'price', 'url', 'price_html')
            else:
                vendors = Item.objects.filter(user=user, name=item.name).values('vendor_name', 'id', 'price', 'url', 'price_html')
        
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
        updated = check_updated(item, price)
        item.price = price
        item.save()
        Price.objects.create(item=item, value=price)
        return Response({'price': price, 'updated': updated, 'item': item.name})


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
        updated = check_updated(item, price)
        item.price = price
        item.save()
        Price.objects.create(item=item, value=price)
        return Response({'price': price, 'updated': updated, 'item': item.name})
        

# for testing 
def testprice(request):
    return render(request, "item.html")
