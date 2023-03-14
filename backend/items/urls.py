from django.urls import path
from items.views.ItemsView import *
from items.views.PricesView import *

app_name = 'items'

urlpatterns = [
    path('create/', CreateItemsView.as_view(), name='add-item'),
    path('get-items/', GetItemsView.as_view(), name='get-items'),
    path('delete-item/<int:item_id>/', DeleteItemView.as_view(), name='delete-item'),
    path('update-item/<int:item_id>/', UpdateItemView.as_view(), name='update-item'),
    path('get-item-prices/<int:item_id>/', ItemsPricesView.as_view(), name='get-items-prices')

]
