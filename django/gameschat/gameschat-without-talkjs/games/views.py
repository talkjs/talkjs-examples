from .models import Game
from django.urls import reverse
from django.contrib import messages
from django.shortcuts import render
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin

def can_perform_action(user, owner):
    if user == owner:
        return True
    return False

class GamesListView(ListView):
    model = Game
    template_name = 'games/games.html'
    context_object_name = 'games'
    paginate_by = 10
    ordering = ['-id']

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        if not context['games']:
            context['games'] = {}
            messages.warning(self.request, f'There are no games at the moment...')

        return context

class GameCreateView(LoginRequiredMixin, CreateView):
    model = Game
    template_name = 'games/game_create.html'
    fields = ['name', 'description', 'image_url']

    def form_valid(self, form):
        form.instance.owner = self.request.user
        return super().form_valid(form)

class GameUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Game
    template_name = 'games/game_update.html'
    fields = ['name', 'description', 'image_url']
    success_url = '/'

    def form_valid(self, form):
        form.instance.owner = self.request.user
        return super().form_valid(form)

    def test_func(self):
        game = self.get_object()
        return can_perform_action(self.request.user, game.owner)


class GameDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Game
    template_name = 'games/game_delete.html'
    success_url = '/'

    def test_func(self):
        game = self.get_object()
        return can_perform_action(self.request.user, game.owner)

def error_invitation(request):
    return render(request, 'games/error_invitation.html')
