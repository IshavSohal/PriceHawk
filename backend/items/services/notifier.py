from django.core.mail import send_mail
from users.models import PHUser
from items.models import Item, Price

def notify(item):
    if item.user and item.user.emailnotifications:
        send_mail(
            f'Price Hawk: {item.name} Update',
            f'{item.name} is now worth ${item.price}. You can check it out at {item.url}',
            'pricehawk@potatodiet.ca',
            [item.user.email],
            fail_silently=False
        )
        return True
    return False

def check_updated(item, price):
    latest = item.Prices.latest("date")
    return latest.value != price
