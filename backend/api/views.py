from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from api.serializers import UserSerializer, GroupSerializer
from .services.registration_service import RegistrationService
from .services.forgotpassword_service import ForgotPasswordService

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    @action(detail=False, permission_classes=[permissions.AllowAny])
    def validate(self, request):
        email = request.query_params.get('email')
        key = request.query_params.get('key')
        user = User.objects.filter(email=email)

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

    def get_permissions(self):
        if self.action in ('create', 'validate'):
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    @action(detail=False)
    def resetpassword(self, request):
        email = request.query_params.get('email')
        user = User.objects.filter(email=email)

        if not email:
            return Response("Email field is required", status=status.HTTP_400_BAD_REQUEST)
        if not User.objects.filter(email=email).exists():
            return Response("A user with that email does not exist", status=status.HTTP_400_BAD_REQUEST)

        ForgotPasswordService.send_email(email)
        return Response('', status=status.HTTP_200_OK)
        

    @action(detail=False)
    def changepassword(self, request):
        email = request.query_params.get('email')
        password = request.query_params.get('password')
        key = request.query_params.get('key')
        user = User.objects.filter(email=email)

        if ForgotPasswordService.validate_key(key):
            user = User.objects.filter(id=ForgotPasswordService.hashtable[key][0])

            if (datetime.now() - ForgotPasswordService.hashtable[key][1])/3600 >= 1:
                return Response('Time limit exceeded', status=status.HTTP_400_BAD_REQUEST)
                
            #user.update(is_active=True)
            user.set_password(password)
            del ForgotPasswordService.hashtable[key]
            return Response('', status=status.HTTP_200_OK)

        else:
            return Response('Invalid key.', status=status.HTTP_400_BAD_REQUEST)