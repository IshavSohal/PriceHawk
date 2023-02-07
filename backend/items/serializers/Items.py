from rest_framework import serializers
from items.models import Item
from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied

class ItemSerializer(serializers.ModelSerializer):
    """
    Serializer for Item, renders Item class to JSON
    to help with requests.
    """

    class Meta:
        model = Item
        fields = ['id', 'name', 'price', 'url', 'created']
        extra_kwargs = {'created': {'read_only': True}}

    def validate_price(self, value):
        """
        Return price iff valid otherwise
        raise validation error.
        """
        if value < 0:
            raise serializers.ValidationError("Invalid price")
        return value

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
        
        guest = request.COOKIES.get('fingerprint')
        if Item.objects.filter(guest_session=guest, name=name, url=url).exists():
                raise PermissionDenied("Already tracking this item!", 403)
        return Item.objects.create(
                guest_session = guest,
                name = name,
                price = price,
                url = url
            )