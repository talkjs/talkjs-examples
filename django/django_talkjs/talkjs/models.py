from django.db import models
from django.contrib.auth.models import User

class TalkJSUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo_url = models.CharField(max_length=200, blank=True)
    welcome_message = models.CharField(max_length=200, blank=True, null=True)
    phone = models.CharField(max_length=200, blank=True, null=True)
    locale = models.CharField(max_length=200, blank=True, null=True)
    availability_text = models.CharField(max_length=200, blank=True, null=True)
    role = models.CharField(max_length=200, blank=True, null=True)
    custom= models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return f'TalkJSUser: {self.user.username}'