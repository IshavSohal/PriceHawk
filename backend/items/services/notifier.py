from django.core.mail import send_mail


def notify(item, price, url, recipient):

    send_mail(
        f'Price Hawk: {item} Update',
        f'{item} is now worth ${price}. You can check it out at {url}',
        'pricehawk@potatodiet.ca',
        [recipient],
        fail_silently=False
    )