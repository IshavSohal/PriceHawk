# Generated by Django 4.1.7 on 2023-03-28 03:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0003_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='vendor_name',
            field=models.FloatField(default=3.1, max_length=100),
            preserve_default=False,
        ),
    ]
