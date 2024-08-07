from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import TalkJSUser
from django.contrib.auth.models import User

def index(request):
    return HttpResponse("This is a demo project for using TalkJS with Django. To try it out, go to <a href='/chat/alice'>/chat/alice</a>.")

def chat(request, me_username, other_username):
    me_user = get_object_or_404(User, username=me_username)
    me_talkjs_user = get_object_or_404(TalkJSUser, user=me_user)
    other_user = get_object_or_404(User, username=other_username)
    other_talkjs_user = get_object_or_404(TalkJSUser, user=other_user)
    context = {
        'me': me_talkjs_user,
        'other': other_talkjs_user
    }
    return render(request, 'talkjs/chat.html', context)

def selectchat(request, me_username):
    me_user = get_object_or_404(User, username=me_username)
    me_talkjs_user = get_object_or_404(TalkJSUser, user=me_user)

    others = TalkJSUser.objects.exclude(user=me_user)

    context = {
        'me': me_talkjs_user,
        'others': others,
    }
    return render(request, 'talkjs/selectchat.html', context)