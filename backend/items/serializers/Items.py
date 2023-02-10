from rest_framework import serializers
from items.models import Item
from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied

class ItemSerializer(serializers.ModelSerializer):
    """
    Serializer for Item, renders Item class to JSON
    to help with requests.
    """
    guestid = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Item
        fields = ['id', 'name', 'price', 'url', 'created', 'guestid']
        extra_kwargs = {'created': {'read_only': True}, 'guestid': {'write_only': True}}

    def validate_price(self, value):
        """
        Return price iff valid otherwise
        raise validation error.
        """
        try:
            value = float(value)
            if value < 0:
                raise serializers.ValidationError("Invalid price")
            return value
        except:
            raise serializers.ValidationError("Invalid price")

    def create(self, validated_data):
        """
        Handles post request for creating new item.
        Item with user attribute created for registered user,
        while Item with unique guest identifier created for guest
        user.
        """
        request = self.context.get('request', None)
        user = request.user
        name, price, url = validated_data.get('name'), validated_data.get('price'), validated_data.get('url')

        if user.is_authenticated:
            if Item.objects.filter(user=user, name=name, url=url).exists():
                raise PermissionDenied("Already tracking this item!", 403)

            return Item.objects.create(
                user = user,
                name = name,
                price = price,
                url = url
            )
        
        
        guest = validated_data.get('guestid')
        if not guest:
            raise PermissionDenied("Guest ID must be provided if not signed in", 403)
        if Item.objects.filter(guest_session=guest, name=name, url=url).exists():
            raise PermissionDenied("Already tracking this item!", 403)
        return Item.objects.create(
                guest_session = guest,
                name = name,
                price = price,
                url = url
            )