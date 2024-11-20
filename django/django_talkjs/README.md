# TalkJS and Django example

This is an example project for TalkJS's tutorial on [how to build a Django chat app with TalkJS](https://talkjs.com/resources/how-to-build-a-django-chat-app-with-talkjs/). This example demonstrates how to integrate TalkJS with a Python application that uses the Django framework.

> [!TIP]
> [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/django.django_talkjs.zip)

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- [Python](https://www.python.org/downloads/)

## How to run the tutorial

1. Clone or [download this project](https://github.com/talkjs/talkjs-examples/releases/latest/download/django.django_talkjs.zip).
2. Replace `<APP_ID>` in `talkjs/templates/talkjs/chat.html` with the value found in the **Settings** tab of your [TalkJS dashboard](https://talkjs.com/dashboard/login).
3. Install Django:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use: venv\Scripts\activate
   pip install django
   ```
4. Run `python manage.py migrate` to create the database tables.
5. Run `python manage.py seed_users` to seed the database with test data (this will first delete any test data that's already in the database).
6. Run `python manage.py runserver` to start the server.
7. Go to `http://127.0.0.1:8000/chat/alice` to try the example out.
