from items.serializers.Items import ItemSerializer
from rest_framework.generics import CreateAPIView
from rest_framework import permissions


class CreateItemsView(CreateAPIView):
    """
    Handles post request for creating 
    a new item for the user.
    """
    serializer_class = ItemSerializer
    permission_classes = [permissions.AllowAny]
