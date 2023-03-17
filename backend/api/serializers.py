from django.contrib.auth.models import Group
from users.models import PHUser
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .services.registration_service import RegistrationService

'''
https://stackoverflow.com/questions/62498581/typeerror-when-merging-dictionaries-unsupported-operand-types-for-dict-a
source combining dictionaries
'''

class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = PHUser
        fields = ['url', 'username', 'password', 'email', 'groups', 'emailnotifications', 'pro', 'priceInterval', 'google']

    def create(self, validated_data):
        RegistrationService.send_email(validated_data.get('email'))
        return super().create({**validated_data, **{'is_active': False}})

    def validate_email(self, value):
        if PHUser.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "A user with that email already exists.")

        return value

    def validate_password(self, value):
        return make_password(value)
        

class GoogleUserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = PHUser
        fields = ['url', 'username', 'password', 'email', 'groups', 'emailnotifications', 'pro', 'priceInterval', 'google']

    def validate_password(self, value):
        return make_password(value)

    def create(self, validated_data):
        return super().create({**validated_data, **{'google': True}})


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
