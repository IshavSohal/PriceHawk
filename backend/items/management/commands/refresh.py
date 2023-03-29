from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from items.models import Item, Price
from items.services.scraper import extract_price


class Command(BaseCommand):
    help = "Refreshes item prices."

    def handle(self, *_args, **_options):
        now = datetime.now().astimezone()
        for item in Item.objects.all():
            latest = item.Prices.latest("date").date
            interval = item.user.priceInterval
            diff = now - timedelta(hours=interval)
            if latest > diff:
                continue

            price = extract_price(item.url, item.price_html)
            if not price:
                continue
            item.price = price
            item.save()
            Price.objects.create(item=item, value=price)
