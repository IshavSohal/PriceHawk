from items.serializers.items import ItemSerializer
from rest_framework.generics import CreateAPIView

class CreateItemsView(CreateAPIView):
    serializer_class = ItemSerializer
