from items.serializers.Items import ItemSerializer
from rest_framework.generics import CreateAPIView

class CreateItemsView(CreateAPIView):
    serializer_class = ItemSerializer
