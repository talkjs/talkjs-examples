import json
import hmac
import string
import random
import hashlib
import requests
from django.conf import settings
from django.shortcuts import redirect
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

app_id = settings.TALKJS_APP_ID
content_type = 'application/json'
secret = settings.TALKJS_API_SECRET
authorization = f'Bearer {secret}'
talkjs_base_url = f'{settings.TALKJS_API_BASE_URL}{app_id}'

headers = {
    'Content-type': content_type,
    'Authorization': authorization,
}

@login_required
def current_session(request):
    if request.is_ajax():
        hash = hmac.new(
            bytes(secret, 'utf-8'),  
            bytes(str(request.user.id), 'utf-8'), 
            hashlib.sha256
        )

        return JsonResponse({
            'appId': app_id,
            'me': get_talkjs_user_object(request.user),
            'signature': hash.hexdigest()
        })
    return bad_request()

@login_required
def private_message_to_talkjs_chat(request, other_id):
    if request.is_ajax():
        other = User.objects.get(pk=other_id)
        return JsonResponse({
            'me': get_talkjs_user_object(request.user),
            'other': get_talkjs_user_object(other)
        })
    return bad_request()

@csrf_exempt
@login_required
def quick_message_to_talkjs_chat(request, conversationId):
    if request.is_ajax() and request.method == 'POST':
        url, data = get_request_prerequisites(f'/conversations/{conversationId}/messages', [{
            'text': request.POST['message'],
            'sender': str(request.user.id),
            'type': 'UserMessage'
        }])

        response = requests.post(url, data=data, headers=headers)
        return get_response_result(response)
    return bad_request()

@csrf_exempt
@login_required
def create_talkjs_chat(request):
    if request.is_ajax() and request.method == 'POST':
        participantsIds = request.POST.getlist('participants[]')
        participants_count = len(participantsIds)
        is_group = participants_count > 1 # excluding the current user
        participantsIds.append(str(request.user.id))

        synchronize_talkjs_participants(participantsIds, is_group)

        conversationId = 'chat_' + ''.join(random.choices(string.digits, k=5))
        url, data = get_request_prerequisites(f'/conversations/{conversationId}', {
            'participants': participantsIds,
            'subject': request.POST['subject'],
            'welcomeMessages': [request.POST['welcomeMessage']] if request.POST['welcomeMessage'] else None,
            'photoUrl': request.POST['photoUrl'] if request.POST['photoUrl'] else None
        })

        response = requests.put(url, data=data, headers=headers)
        
        if response.ok:
            message = f'This is a group chat with {participants_count} more people!' if is_group else 'This is a private chat!' 
            send_talkjs_system_message(message, conversationId)

            participants = []

            for participantId in participantsIds:
                participant = get_talkjs_user_object(User.objects.get(id=participantId))
                participants.append(participant)

            talkjs_chat_data = { 'conversationId': conversationId, 'participants': participants }
            return JsonResponse(talkjs_chat_data, status=200)
    return bad_request()

@login_required
def invite_to_talkjs_chat(request, conversationId):
    conversation = get_talkjs_conversation(conversationId)
    participants_count = len(conversation['participants'])

    if participants_count < 5:
        synchronize_talkjs_participant(request.user.id, True)
        url, data = get_request_prerequisites(f'/conversations/{conversationId}/participants/{request.user.id}', [{ 'access': 'ReadWrite', 'notify': True }])
        response = requests.put(url, data=data, headers=headers)

        if response.ok:
            return redirect('inbox')

    return redirect('error-invitation')

@login_required
def leave_talkjs_chat(request, conversationId):
    url = get_request_prerequisites(f'/conversations/{conversationId}/participants/{request.user.id}')
    response = requests.delete(url, headers=headers)
    return get_response_result(response)

def synchronize_talkjs_participants(participants, is_group):
    for participantId in participants:
        synchronize_talkjs_participant(participantId, is_group)

def synchronize_talkjs_participant(participantId, is_group):
    participant = get_talkjs_user_object(User.objects.get(pk=participantId))

    url, data = get_request_prerequisites(f'/users/{participantId}', {
        'name': participant['name'],
        'email': [participant['email']],
        'photoUrl': participant['photoUrl'],
        'welcomeMessage': None if is_group else participant['welcomeMessage']
    })

    response = requests.put(url, data=data, headers=headers)
    return get_response_result(response)

def get_talkjs_conversation(conversationId):
    url = get_request_prerequisites(f'/conversations/{conversationId}')
    response = requests.get(url, headers=headers)
    return response.json()

def send_talkjs_system_message(message, conversationId):
    url, data =  get_request_prerequisites(f'/conversations/{conversationId}/messages', [{ 'text': message, 'type': 'SystemMessage' }])
    response = requests.post(url, data=data, headers=headers)
    return get_response_result(response)

def get_talkjs_user_object(user):
    return {
        'id': user.id,
        'name': user.username,
        'email': user.email,
        'photoUrl':  user.profile.image_url,
        'welcomeMessage': user.profile.welcome_message
    }

def get_request_prerequisites(endpoint, data=None):
    url = f'{talkjs_base_url}{endpoint}'

    if data is None:
        return url
    return url, json.dumps(data)

def get_response_result(response):
    if response.ok:
        return ok_request()
    return bad_request()

def bad_request():
    return HttpResponse(status=400)

def ok_request():
    return HttpResponse(status=200)