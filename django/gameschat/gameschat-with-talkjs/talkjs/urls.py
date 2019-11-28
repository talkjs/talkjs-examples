from django.conf.urls import url, include
from .views import (
    current_session,
    private_message_to_talkjs_chat, 
    quick_message_to_talkjs_chat,
    create_talkjs_chat,
    invite_to_talkjs_chat,
    leave_talkjs_chat
)

urlpatterns = [
    url(r'private/(?P<other_id>[\d]+)/', private_message_to_talkjs_chat, name='talk-private'),
    url('session/current/', current_session, name='talk-current-session'),
    url(r'quick/(?P<conversationId>\w+)/', quick_message_to_talkjs_chat, name='talk-quick-message'),
    url('chat/', create_talkjs_chat, name='talk-create-chat'),
    url(r'leave/(?P<conversationId>\w+)/', leave_talkjs_chat, name='talk-leave-chat'),
    url(r'invitation/(?P<conversationId>\w+)/', invite_to_talkjs_chat, name='talk-invitation'),
]