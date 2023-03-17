from django.core.mail import send_mail
from hashlib import sha256
from uuid import uuid4
from datetime import datetime


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
        return key in hashtable

    def gen_key(email):
        user = User.objects.filter(email=email)
        user_id = user.id
        key = uuid4()
        date_time = datetime.now()
        hashtable[key] = (user_id, date_time)
        return key
