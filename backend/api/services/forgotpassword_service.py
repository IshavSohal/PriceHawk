from django.core.mail import send_mail
from hashlib import sha256
from uuid import uuid4
from datetime import datetime
from users.models import PHUser


class ForgotPasswordService:
    hashtable = {}

    def send_email(recipient):
        key = ForgotPasswordService.gen_key(recipient)

        send_mail(
            'Price Hawk User Forgot Password',
            f'If this was you, your key is {key}',
            'pricehawk@potatodiet.ca',
            [recipient],
            fail_silently=False
        )

    def validate_key(key):
        return key in ForgotPasswordService.hashtable

    def gen_key(email):
        user = PHUser.objects.filter(email=email)
        key = uuid4()
        date_time = datetime.now()
        ForgotPasswordService.hashtable[key] = (email, date_time)
        return key
