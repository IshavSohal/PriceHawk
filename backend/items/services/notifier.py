from django.core.mail import send_mail
from django.contrib.auth.models import User
from items.models import Item, Price

def notify(item, price):

    latest = item.Prices.latest("date")
    if latest.value != price:
        if item.user:
            send_mail(
                f'Price Hawk: {item.name} Update',
                f'{item.name} is now worth ${price}. You can check it out at {item.url}',
                'pricehawk@potatodiet.ca',
                [item.user.email],
                fail_silently=False
            )
        return True
    
    return False
