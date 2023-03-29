from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from items.models import Item, Price
from items.services.scraper import extract_price
from items.services.notifier import notify, check_updated


class Command(BaseCommand):
    help = "Refreshes item prices."

    def handle(self, *_args, **_options):
        now = datetime.now().astimezone()
        print(f'[{now}]: running item updates.')
        for item in Item.objects.all():
            try:
                if not item.user:
                    continue #skip guest users

                latest = item.Prices.latest("date").date
                interval = item.user.priceInterval
                diff = now - timedelta(hours=interval)
                if latest > diff:
                    continue

                price = extract_price(item.url, item.price_html)
                if not price:
                    continue
                print(f'{item.name} updated for {item.user.email}')
                updated = check_updated(item, price)
                item.price = price
                item.save()
                if updated:
                    notify(item)
                Price.objects.create(item=item, value=price)
            except Exception as e:
                print(f'Skipping {item.name} for {item.user.email}: {e}')
                continue
