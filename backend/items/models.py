from django.db import models
from django.contrib.auth.models import User
from django.db.models import SET_NULL

# Create your models here.
class Item(models.Model):
    user = models.ForeignKey(to=User, on_delete=SET_NULL, null=True, related_name='items')
    guest_session = models.CharField(null=True, max_length=100)
    name = models.CharField(max_length=50)
    price = models.FloatField(default=0.0)
    url = models.CharField(max_length=250)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name}: {self.price}'