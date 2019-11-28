from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image_url = models.URLField(max_length=2048, blank=True)
    welcome_message = models.CharField(max_length=100, blank=True, null=True)
    is_online = models.BooleanField(default=False)

    def __str__(self):
        return f'Profile: {self.user.username}'
