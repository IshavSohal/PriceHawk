from django.urls import path
from users.views import CreateListUserView, GetUser

app_name = 'users'

urlpatterns = [
    path('login/', CreateListUserView.as_view(), name='login'),
    path('get/<str:username>/', GetUser.as_view(), name='get'),
]
