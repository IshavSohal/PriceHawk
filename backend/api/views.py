from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User, Group
from users.models import PHUser
from rest_framework import viewsets, permissions, status, authentication
from rest_framework.decorators import action, authentication_classes, permission_classes, api_view
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, get_object_or_404
from api.serializers import UserSerializer, GoogleUserSerializer
from .services.registration_service import RegistrationService
from .services.forgotpassword_service import ForgotPasswordService
from datetime import datetime
import uuid

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

    @action(detail=False, methods=['patch'])
    def change(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    def get_permissions(self):
        if self.action in ('create', 'validate', 'resetpassword', 'changepassword'):
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
    
    def get_object(self):
        return get_object_or_404(PHUser, id=self.request.user.id)


    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny], authentication_classes = [])
    def resetpassword(self, request):
        email = request.data.get('email')

        if not email:
            return Response("Email field is required", status=status.HTTP_400_BAD_REQUEST)
        if not PHUser.objects.filter(email=email).exists():
            return Response("A user with that email does not exist", status=status.HTTP_400_BAD_REQUEST)

        ForgotPasswordService.send_email(email)
        return Response('', status=status.HTTP_200_OK)
        

    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny], authentication_classes = [])
    def changepassword(self, request):
        password = request.data.get('password')
        key = request.data.get('key')
        try:
            key = uuid.UUID(key)
        except:
            return Response('Invalid key', status=status.HTTP_400_BAD_REQUEST)
        

        if ForgotPasswordService.validate_key(key):
            user = PHUser.objects.filter(email=ForgotPasswordService.hashtable[key][0])

            if (datetime.now() - ForgotPasswordService.hashtable[key][1]).seconds >= 3600:
                del ForgotPasswordService.hashtable[key]
                return Response('Time limit exceeded', status=status.HTTP_400_BAD_REQUEST)

            hashed_password = UserViewSet.serializer_class.validate_password(UserViewSet.serializer_class, password)
            user.update(password = hashed_password)
            
            del ForgotPasswordService.hashtable[key]
            return Response('', status=status.HTTP_200_OK)

        else:
            return Response('Invalid key', status=status.HTTP_400_BAD_REQUEST)



class CreateGoogleUser(CreateAPIView):
    serializer_class = GoogleUserSerializer
    
    def get_permissions(self):
        return [permissions.AllowAny()]
