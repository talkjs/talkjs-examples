from django.conf import settings
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import load_backend, login, logout
from django.shortcuts import render, redirect, HttpResponseRedirect
from .forms import UserRegisterForm, UserLoginForm, UserUpdateForm, ProfileUpdateForm

def user_register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            user = form.register()
            messages.success(request, f'Your account has been created! Welcome {user.username}!')
            return authenticate(request, user)
    else:
        form = UserRegisterForm()
    return render(request, 'users/register.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        form = UserLoginForm(request.POST)
        if form.is_valid():
            user = form.login()
            messages.success(request, f'Welcome again {user.username}!')
            return authenticate(request, user)
    else:
        form = UserLoginForm()
    return render(request, 'users/login.html', {'form': form})

def authenticate(request, user):
    next_page = request.GET.get('next', '/')
    
    if not hasattr(user, 'backend'):
        for backend in settings.AUTHENTICATION_BACKENDS:
            if user == load_backend(backend).get_user(user.pk):
                user.backend = backend
                break
    if hasattr(user, 'backend'):
        login(request, user)
        return HttpResponseRedirect(next_page)

@login_required
def profile(request):
    if request.method == 'POST':
        user_form = UserUpdateForm(request.POST, instance=request.user)
        profile_form = ProfileUpdateForm(request.POST, instance=request.user.profile)

        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            messages.success(request, f'Your account has been updated!')
            return redirect('profile')
    else:
        user_form = UserUpdateForm(instance=request.user)
        profile_form = ProfileUpdateForm(instance=request.user.profile)

    context = {
        'user_form': user_form,
        'profile_form': profile_form
    }

    return render(request, 'users/profile.html', context=context)

@login_required
def inbox(request):
    context = {
        'quick_messages': ['Hello there!', 'How are you?', 'Be right back!', 'I\'m fine, thank you!', f'My name is {request.user.username}', 
            f'You can send me an email - {request.user.email}', 'Cool!', 'Yes!', 'No!', 'Nice to meet you!', 'Of course!', 'I love this game!']
    }
    return render(request, 'users/inbox.html', context=context)

@login_required
def chat(request):
    users_with_status = []
    users = User.objects.all().exclude(id__in=[request.user.id])

    for user in users:
        users_with_status.append({
            'id': user.id,
            'username': user.username,
            'is_online': user.profile.is_online
        })
    return render(request, 'users/chat.html', { 'users': users_with_status })

