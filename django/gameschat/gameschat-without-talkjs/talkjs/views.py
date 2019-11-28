from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

@login_required
def current_session(request):
    return HttpResponse(200)

@login_required
def private_message_to_talkjs_chat(request, other_id):
    return HttpResponse(200)

@csrf_exempt
@login_required
def quick_message_to_talkjs_chat(request, conversationId):
    return HttpResponse(200)

@csrf_exempt
@login_required
def create_talkjs_chat(request):
    return HttpResponse(200)

@login_required
def invite_to_talkjs_chat(request, conversationId):
    return HttpResponse(200)

@login_required
def leave_talkjs_chat(request, conversationId):
    return HttpResponse(200)

def synchronize_talkjs_participants(participants, is_group):
    return HttpResponse(200)

def synchronize_talkjs_participant(participantId, is_group):
   return HttpResponse(200)

def get_talkjs_conversation(conversationId):
   return HttpResponse(200)

def send_talkjs_system_message(message, conversationId):
    return HttpResponse(200)

def get_talkjs_user_object(user):
    return HttpResponse(200)

def get_request_prerequisites(endpoint, data=None):
   return HttpResponse(200)

def get_response_result(response):
    return HttpResponse(200)

def bad_request():
   return HttpResponse(200)
   
def ok_request():
    return HttpResponse(200)