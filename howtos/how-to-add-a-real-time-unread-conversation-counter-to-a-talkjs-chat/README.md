# This sample code accompanies a guide on How to Add a Real-time Unread Conversation Counter to a TalkJS Chat

- [Read it on our blog]({blog url})
- [Read it on dev.to](https://dev.to/talkjs/how-to-add-a-real-time-unread-conversation-counter-to-a-talkjs-chat-2o05)

## Project Setup

- index.php is a basic HTML page with a TalkJS instance.
- Replace the APP_ID in each index.php with your own APPID
- Copy index.php to your local server webroot (example: C:\wamp\www)
- Visit <https://localhost> or the webroot from the browser to view the chat instance for this user.

## Initiate First Messages Using The Rest API

- You can better understand this demo with multiple users chatting with each other. 
- Therefore, you can create another index.php (user1/index.php) and replace the user id with a different one. You can create multiple Talkjs instances like this.
- Once you have your instances ready, now you can get a conversation going between these users using the REST API.
  - <https://talkjs.com/docs/Reference/REST_API/Conversations/>
- After creating a conversation, send an initial message from each user to the conversation using the REST API.
  - <https://talkjs.com/docs/Reference/REST_API/Messages/>
- Now, your TalkJS instances should start showing up messages.
- Create multiple different conversations to understand better how the Unread counter works here.
