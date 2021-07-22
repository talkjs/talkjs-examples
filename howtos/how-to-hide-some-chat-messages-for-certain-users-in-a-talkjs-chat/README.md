# This sample code accompanies a guide on How to Hide Some Chat Messages for Certain Users in a TalkJS Chat

- [Read it on our blog]({blog url})
- [Read it on dev.to](https://dev.to/talkjs/how-to-hide-some-chat-messages-for-certain-users-in-a-talkjs-chat-23g4)

## Project Setup

- Each folder contains a TalkJS instance (index.php) for a different user.
- Replace the APP_ID in each index.php with your own APPID
- Copy the entire folder onto your local server webroot (example: C:\wamp\www)
- index.php
  - User: Chris Pratt, Role: Accountant
  - Visit <https://localhost> or the webroot from the browser to view the chat instance for this user.
- Sundar/index.php
  - User: Sundar, Role: Staff
  - Visit <https://localhost/Sundar> from the browser to view the chat instance for this user.
- Admin/index.php
  - User: Stella, Role: Admin
  - Visit <https://localhost/Admin> from the browser to view the chat instance for this user.
- Banned/index.php
  - User: Matt Wong, Role: Banned
  - Visit <https://localhost/Banned> from the browser to view the chat instance for this user.

## Initiate First Messages Using The Rest Api

- At first, the chat window will be empty. To get a conversation going between these 4 users, create a conversation using the REST API and add these 4 users to the participants list.
  - <https://talkjs.com/docs/Reference/REST_API/Conversations/>
- After creating a conversation, send an initial message from each user to the conversation using the REST API.
  - <https://talkjs.com/docs/Reference/REST_API/Messages/>
- Now every users TalkJS instances should start showing up messages.

**You are now free to start playing around and apply differnt filters!**
