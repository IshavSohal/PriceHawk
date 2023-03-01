from rest_framework.generics import ListAPIView
from items.serializers.Items import ItemSerializer
from items.models import Item
from rest_framework.permissions import IsAuthenticated

class GetUserItemsView(ListAPIView):
    """
    Handles get request to display all
    the user's items in their tracking page
    """
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Item.objects.filter(user=self.request.user)