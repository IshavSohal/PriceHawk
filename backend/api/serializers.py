from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .services.registration_service import RegistrationService


class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ['url', 'username', 'password', 'email', 'groups']

    def create(self, validated_data):
        RegistrationService.send_email(validated_data.get('email'))

        return User.objects.create_user(
            **validated_data,
            is_active=False
        )

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "A user with that email already exists.")

        return value

    def change_password_1(self, validated_data):
        


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
