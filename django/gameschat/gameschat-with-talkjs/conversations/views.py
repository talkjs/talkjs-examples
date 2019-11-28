from games.models import Game
from django.urls import reverse
from django.contrib import messages
from django.shortcuts import render
from .models import Conversation, Answer
from django.core.paginator import Paginator
from django.http import HttpResponse, JsonResponse
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin

def can_perform_action(user, owner):
    if user == owner:
        return True
    return False

class ConversationsListView(LoginRequiredMixin, ListView):
    model = Conversation
    template_name = 'conversations/conversations.html'
    context_object_name = 'conversations'
    paginate_by = 20
    
    def get_queryset(self):
        return list(Game.objects.get(id=self.kwargs['game_id']).conversation_set.all())

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['game_id'] = self.kwargs['game_id']
        context['game_name'] = Game.objects.get(id=self.kwargs['game_id']).name

        if not context['conversations']:
            context['conversations'] = {}
            messages.warning(self.request, f'There are no conversations at the moment...')

        return context

class ConversationCreateView(LoginRequiredMixin, CreateView):
    model = Conversation 
    template_name = 'conversations/conversation_create.html'
    fields = ['name', 'text']

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['game_id'] = self.kwargs['game_id']
        return context

    def form_valid(self, form):
        form.instance.owner = self.request.user
        form.instance.game = Game.objects.get(id=self.kwargs['game_id'])
        return super().form_valid(form)


class ConversationUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Conversation
    template_name = 'conversations/conversation_update.html'
    fields = ['name', 'text']

    def form_valid(self, form):
        form.instance.owner = self.request.user
        form.instance.game = Game.objects.get(id=self.kwargs['game_id'])
        return super().form_valid(form)
    
    def test_func(self):
        conversation = self.get_object()
        return can_perform_action(self.request.user, conversation.owner)

class ConversationDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Conversation
    template_name = 'conversations/conversation_delete.html'

    def get_success_url(self):
        return reverse('conversations', kwargs={'game_id': self.kwargs['game_id']})

    def test_func(self):
        conversation = self.get_object()
        return can_perform_action(self.request.user, conversation.owner)

class AnswerCreateView(LoginRequiredMixin, CreateView):
    model = Answer
    template_name = 'conversations/conversation_answer.html'
    fields = ['text']

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['game_id'] = self.kwargs['game_id']
        return context

    def form_valid(self, form):
        form.instance.owner = self.request.user
        form.instance.conversation = Conversation.objects.get(id=self.kwargs['pk'])
        return super().form_valid(form)

class AnswerUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Answer
    template_name = 'conversations/conversation_answer_update.html'
    fields = ['text']

    def form_valid(self, form):
        form.instance.owner = self.request.user
        form.instance.conversation = Conversation.objects.get(id=self.kwargs['conv_id'])
        return super().form_valid(form)
    
    def test_func(self):
        answer = self.get_object()
        return can_perform_action(self.request.user, answer.owner)

class AnswerDeleteView(LoginRequiredMixin, DeleteView):
    model = Answer
    template_name = 'conversations/conversation_answer_delete.html'

    def get_success_url(self):
        return reverse('conversations', kwargs={'game_id': self.kwargs['game_id']})