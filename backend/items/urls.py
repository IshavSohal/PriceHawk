from django.urls import path
from items.views.CreateItemView import *


app_name = 'items'

urlpatterns = [
    path('create/', CreateItemsView.as_view(), name='add-item'),
]