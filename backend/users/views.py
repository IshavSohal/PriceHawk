from django.contrib.auth.models import User
from rest_framework.generics import ListCreateAPIView, RetrieveDestroyAPIView, get_object_or_404
from users.serializers import UserSerializer

class CreateListUserView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GetUser(RetrieveDestroyAPIView):
    serializer_class = UserSerializer
    
    def get_object(self):
        return get_object_or_404(User, username=self.kwargs['username'])