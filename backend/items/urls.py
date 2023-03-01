from django.urls import path
from items.views.ItemsView import *
from items.views.GetItemsView import *

app_name = 'items'

urlpatterns = [
    path('create/', CreateItemsView.as_view(), name='add-item'),
    path('get-items/', GetUserItemsView.as_view(), name='get-items')
]
