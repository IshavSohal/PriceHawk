# Generated by Django 4.1.5 on 2023-03-31 20:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0004_alter_item_user_alter_price_item'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='vendor_name',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
