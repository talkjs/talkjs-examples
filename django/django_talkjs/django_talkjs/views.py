from django.http import HttpResponse

def index(request):
    return HttpResponse("This is a demo project for using TalkJS with Django.  To try it out, go to <a href='/chat/alice'>/chat/alice</a>.")