from rest_framework.generics import ListAPIView, GenericAPIView
from items.serializers.Prices import PriceSerializer
from items.models import Price, Item
from rest_framework.generics import get_object_or_404
from rest_framework import permissions, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class ItemsPricesView(ListAPIView):
    serializer_class = PriceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        item = get_object_or_404(Item, pk=self.kwargs['item_id'])
        prices = Price.objects.filter(item=item).order_by('-date')
        return prices


class GuestItemsPricesView(ListAPIView):
    serializer_class = PriceSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        item = get_object_or_404(Item, guest_session=self.kwargs['guest_id'], pk=self.kwargs['item_id'])
        prices = Price.objects.filter(item=item).order_by('-date')
        return prices


class DeleteItemPricesView(GenericAPIView):
    serializer_class = PriceSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        item = get_object_or_404(Item, pk=self.kwargs['item_id'])
        prices = Price.objects.filter(item=item).order_by('-date')
        for price in prices.all():
            price.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DeleteGuestItemPricesView(GenericAPIView):
    serializer_class = PriceSerializer
    permission_classes = [permissions.AllowAny]

    def delete(self, request, *args, **kwargs):
        item = get_object_or_404(Item, guest_session=self.kwargs['guest_id'], pk=self.kwargs['item_id'])
        prices = Price.objects.filter(item=item).order_by('-date')
        for price in prices.all():
            price.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
