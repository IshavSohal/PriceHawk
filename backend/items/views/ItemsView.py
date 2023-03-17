from items.serializers.Items import ItemSerializer
from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView, UpdateAPIView, GenericAPIView
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from items.models import Item, Price
from items.services.scraper import extract_price


class CreateItemsView(CreateAPIView):
    """
    Handles post request for creating
    a new item for the user.
    """
    serializer_class = ItemSerializer
    permission_classes = [permissions.AllowAny]


class GetItemsView(ListAPIView):
    """
    Handles get request to display all
    the user's items in their tracking page
    """
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Item.objects.filter(user=self.request.user)


class DeleteItemView(DestroyAPIView):
    """
    Handles delete request
    to delete a user's item
    """
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Item, pk=self.kwargs['item_id'])


class UpdateItemView(UpdateAPIView):
    """
    Handles patch request
    to update a user's item
    """
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Item, id=self.kwargs['item_id'])


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
