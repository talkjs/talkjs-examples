from django.db import models
from games.models import Game
from django.urls import reverse
from django.utils import timezone
from django.contrib.auth.models import User

class Conversation(models.Model):
    name = models.CharField(max_length=100)
    text = models.CharField(max_length=1000, blank=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'Conversation: {self.name}'

    def get_absolute_url(self):
        return reverse("conversations", kwargs={'game_id': self.game.id})


class Answer(models.Model):
    text = models.CharField(max_length=1000, blank=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'Answer: {self.name} in Conversation: {self.conversation.name}'

    def get_absolute_url(self):
        return reverse("conversations", kwargs={'game_id': self.conversation.game.id})