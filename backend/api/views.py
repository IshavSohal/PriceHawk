from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User, Group
from users.models import PHUser
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, get_object_or_404
from api.serializers import UserSerializer, GoogleUserSerializer
from .services.registration_service import RegistrationService


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = PHUser.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    @action(detail=False, permission_classes=[permissions.AllowAny])
    def validate(self, request):
        email = request.query_params.get('email')
        key = request.query_params.get('key')
        user = PHUser.objects.filter(email=email)

        if RegistrationService.validate_key(email, key):
            user.update(is_active=True)
            return Response('', status=status.HTTP_200_OK)
        else:
            return Response('Invalid key.', status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def logout(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

    @action(detail=False)
    def current(self, request):
        if not request.user:
            return Response('Invalid request.', status=status.HTTP_400_BAD_REQUEST)

        user = UserSerializer(request.user, context={'request': request}).data
        return Response(user, status=status.HTTP_200_OK)

    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @action(detail=False, methods=['patch'])
    def change(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    def get_permissions(self):
        if self.action in ('create', 'validate'):
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
    
    def get_object(self):
        return get_object_or_404(PHUser, id=self.request.user.id)

class CreateGoogleUser(CreateAPIView):
    serializer_class = GoogleUserSerializer
    
    def get_permissions(self):
        return [permissions.AllowAny()]
