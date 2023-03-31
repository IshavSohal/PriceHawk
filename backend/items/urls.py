from django.urls import path
from items.views.ItemsView import *
from items.views.PricesView import *

app_name = 'items'

urlpatterns = [
    path('create/', CreateItemsView.as_view(), name='add-item'),
    path('get-items/', GetItemsView.as_view(), name='get-items'),
    path('get-guest-items/<int:guest_id>/',
         GetGuestItemsView.as_view(), name='get-guest-items'),
    path('delete-item/<int:item_id>/',
         DeleteItemView.as_view(), name='delete-item'),
    path('delete-guest-item/<int:guest_id>/<int:item_id>/',
         DeleteGuestItemView.as_view(), name='delete-guest-item'),
    path('update-item/<int:item_id>/',
         UpdateItemView.as_view(), name='update-item'),
    path('update-guest-item/<int:guest_id>/<int:item_id>/',
         UpdateGuestItemView.as_view(), name='update-guest-item'),
    path('<int:pk>/refresh/', RefreshItemView.as_view(), name='refresh-item'),
    path('<int:pk>/refresh-guest/<int:guest_id>/',
         RefreshGuestItemView.as_view(), name='refresh-guest-item'),
    path('prices/<int:item_id>/', ItemsPricesView.as_view(),
         name='get-items-prices'),
    path('prices/<int:guest_id>/<int:item_id>/', GuestItemsPricesView.as_view(),
         name='get-guest-items-prices'),
]
