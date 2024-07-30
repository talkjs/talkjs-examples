from django.urls import path
from . import views

urlpatterns = [
    # /chat
    path('', views.index, name='index'),
    # ex: /chat/alice
    path('<str:me_username>', views.selectchat, name='selectchat'),
    # ex: /chat/alice/sebastian
    path('<str:me_username>/<str:other_username>', views.chat, name='chat'),
]