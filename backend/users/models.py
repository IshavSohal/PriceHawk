from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

'''
https://stackoverflow.com/questions/65416042/max-and-min-values-for-a-django-model-field-according-to-the-values-already-int
https://stackoverflow.com/questions/42425933/how-do-i-set-a-default-max-and-min-value-for-an-integerfield-django
for how to get the validators
'''

class PHUser(AbstractUser):
    emailnotifications = models.BooleanField(default = False)
    priceInterval = models.FloatField(default = 12, validators = [MinValueValidator(0), MaxValueValidator(24)])
    pro = models.BooleanField(default = False)
    google = models.BooleanField(default = False)
