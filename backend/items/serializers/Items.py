from rest_framework import serializers
from items.models import Item, Price
from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied
from django.core.validators import URLValidator

class ItemSerializer(serializers.ModelSerializer):
    """
    Serializer for Item, renders Item class to JSON
    to help with requests.
    """
    guestid = serializers.CharField(write_only=True, required=False)
    name_html = serializers.CharField(required=False)
    price_html = serializers.CharField(required=False)

    class Meta:
        model = Item
        fields = ['id', 'name', 'price', 'url', 'name_html', 'price_html', 'created', 'guestid']
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
    
    def validate_url(self, value):
        val = URLValidator()
        try:
            val(value)
            return value
        except:
            raise serializers.ValidationError("Invalid URL")

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
        n_html, p_html = validated_data.get('name_html', None), validated_data.get('price_html', None)

        if user.is_authenticated:
            if Item.objects.filter(user=user, name=name, url=url).exists():
                raise PermissionDenied("Already tracking this item!", 403)

            item = Item.objects.create(
                user = user,
                name = name,
                price = price,
                url = url,
                name_html = n_html,
                price_html = p_html
            )
        else:
            guest = validated_data.get('guestid', None)
            if not guest:
                raise PermissionDenied("Guest ID must be provided if not signed in", 403)
            if Item.objects.filter(guest_session=guest, name=name, url=url).exists():
                raise PermissionDenied("Already tracking this item!", 403)
            item = Item.objects.create(
                    guest_session = guest,
                    name = name,
                    price = price,
                    url = url,
                    name_html = n_html,
                    price_html = p_html
                )
        
        Price.objects.create(item=item, value=price)
        return item