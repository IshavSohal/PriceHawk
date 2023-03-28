from django.db import models
from users.models import PHUser

# Create your models here.


class Item(models.Model):
    """
    Object model for Items.
    Fields define the structure for
    how an Item is stored in the data 
    store.
    """

    user = models.ForeignKey(to=PHUser, on_delete=models.SET_NULL, null=True, related_name='items')
    guest_session = models.CharField(null=True, max_length=100)
    name = models.CharField(max_length=50)
    price = models.FloatField(default=0.0)
    vendor_name = models.FloatField(max_length=100)
    url = models.CharField(max_length=250)

    name_html = models.TextField(null=True)
    price_html = models.TextField(null=True)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """
        String representation for Item.
        This is how it will be displayed
        in admin panel.
        """
        return f'{self.name}: {self.price}'


class Price(models.Model):
    """
    Object model for prices.
    """

    item = models.ForeignKey(to=Item, related_name="Prices", null=True, on_delete=models.SET_NULL)
    value = models.FloatField(default=0.0)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """
        String representation for price.
        This is how it will be displayed
        in admin panel.
        """
        return f'{self.item.name} costs {self.value} on {self.date}'
