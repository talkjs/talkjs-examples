from django.contrib import admin
from django.urls import path, include
from users import views as user_views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('games.urls')),
    path('games/<int:game_id>/', include('conversations.urls')),
    path('register/', user_views.user_register, name='register'),
    path('profile/', user_views.profile, name='profile'),
    path('inbox/', user_views.inbox, name='inbox'),
    path('chat/', user_views.chat, name='chat'),
    path('login/', user_views.user_login, name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='users/logout.html'), name='logout'),
    path('talk/', include('talkjs.urls'))
]
