from .models import Profile
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.contrib.auth.signals import user_logged_out, user_logged_in

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        instance.profile.image_url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        instance.profile.save()

@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()

@receiver(user_logged_in)
def user_online(sender, user, request, **kwargs):
    user.profile.is_online = True
    user.profile.save()

@receiver(user_logged_out)
def user_offline(sender, user, request, **kwargs):
    if user:
        user.profile.is_online = False
        user.profile.save()
