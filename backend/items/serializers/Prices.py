from rest_framework import serializers
from items.models import Price, Item

class ItemSerializer(serializers.ModelSerializer):
    """
    Serializer for Item, renders Item class to JSON
    to help with requests.
    """
    item = serializers.IntegerField(source='item.id')
    itemname = serializers.CharField(source='item.name', read_only=True)

    class Meta:
        model = Price
        fields = ['id', 'item', 'itemname', 'value', 'date']