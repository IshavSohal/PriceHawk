from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from items.serializers.Items import PriceSerializer
from items.models import Price, Item

class ItemsPricesView(ListAPIView):
    serializer_class = PriceSerializer

    def get_queryset(self):
        item = get_object_or_404(Item, pk=self.kwargs['item_id'])
        prices = Price.objects.filter(item = item).order_by('-date')
        return prices

    def list(self, request, *args, **kwargs):
        prices = self.get_queryset()
        page = self.paginate_queryset(prices)
        serializer = PriceSerializer(page, many=True)
                
        return self.get_paginated_response(serializer.data)