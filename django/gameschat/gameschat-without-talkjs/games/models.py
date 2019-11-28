from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.contrib.auth.models import User

class Game(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200, blank=True)
    image_url = models.URLField(max_length=2048)
    created_at = models.DateTimeField(default=timezone.now)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"Game: {self.name}"
    
    def get_absolute_url(self):
        return reverse('conversations', kwargs={'game_id': self.pk})
    

