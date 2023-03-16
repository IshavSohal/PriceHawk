from django.core.mail import send_mail
from hashlib import sha256


class ForgotPasswordService:

    def send_email(recipient):
        key = ForgotPasswordService.gen_key(recipient)

        send_mail(
            'Price Hawk User Forgot Password',
            f'If this was you, click http://localhost:8000/users/resetpassword/?email={recipient}&key={key}',
            'pricehawk@potatodiet.ca',
            [recipient],
            fail_silently=False
        )

    def validate_key(email, key):
        return key == ForgotPasswordService.gen_key(email)

    def gen_key(email):
        return sha256(f'VcGWSvHknhswjvGY+{email}'.encode()).hexdigest()
