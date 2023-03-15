from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from items.serializers.Prices import PriceSerializer
from items.models import Price, Item
from rest_framework.generics import get_object_or_404

class ItemsPricesView(ListAPIView):
    serializer_class = PriceSerializer

    def get_queryset(self):
        item = get_object_or_404(Item, pk=self.kwargs['item_id'])
        prices = Price.objects.filter(item = item).order_by('-date')
        return prices