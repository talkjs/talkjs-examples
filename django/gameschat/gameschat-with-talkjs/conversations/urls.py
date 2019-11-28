from .views import (
    ConversationsListView, 
    ConversationCreateView, 
    ConversationUpdateView,
    ConversationDeleteView,
    AnswerCreateView,
    AnswerUpdateView,
    AnswerDeleteView
)
from django.urls import path

urlpatterns = [
    path('conversations/', ConversationsListView.as_view(), name='conversations'),
    path('conversations/new/', ConversationCreateView.as_view(), name='conversation-create'),
    path('conversations/<int:pk>/update/', ConversationUpdateView.as_view(), name='conversation-update'),
    path('conversations/<int:pk>/delete/', ConversationDeleteView.as_view(), name='conversation-delete'),
    path('conversations/<int:pk>/answer/new', AnswerCreateView.as_view(), name='conversation-answer-create'),
    path('conversations/<int:conv_id>/answer/<int:pk>/update', AnswerUpdateView.as_view(), name='conversation-answer-update'),
    path('conversations/<int:conv_id>/answer/<int:pk>/delete', AnswerDeleteView.as_view(), name='conversation-answer-delete')
]
