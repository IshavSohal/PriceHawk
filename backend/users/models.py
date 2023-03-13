from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

class PHUser(AbstractUser):
    emailnotifications = models.BooleanField(default = False)
    priceInterval = models.PositiveIntegerField(default = 12, validators = [MinValueValidator(1), MaxValueValidator(24)])
    pro = models.BooleanField(default = False)
