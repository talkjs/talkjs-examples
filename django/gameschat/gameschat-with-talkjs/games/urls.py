from django.urls import path
from .views import GamesListView, GameCreateView, GameUpdateView, GameDeleteView, error_invitation

urlpatterns = [
    path('', GamesListView.as_view(), name='games'),
    path('games/new/', GameCreateView.as_view(), name='game-create'),
    path('games/<int:pk>/update/', GameUpdateView.as_view(), name='game-update'),
    path('games/<int:pk>/delete/', GameDeleteView.as_view(), name='game-delete'),
    path('invitation/error/', error_invitation, name='error-invitation')
]
