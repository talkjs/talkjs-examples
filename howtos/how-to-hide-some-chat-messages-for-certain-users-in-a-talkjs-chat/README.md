# How to hide messages for users in a TalkJS chat

This sample code accompanies a guide on [How to hide messages for users in a TalkJS chat](https://talkjs.com/resources/how-to-hide-some-chat-messages-for-certain-users-in-a-talkjs-chat/).

> [!TIP]
> [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/howtos.how-to-hide-some-chat-messages-for-certain-users-in-a-talkjs-chat.zip)

## Project setup

- Each folder contains a TalkJS instance (`index.php`) for a different user.
- Replace the `APP_ID` in each `index.php` with your own app ID. You can find your app ID on the **Settings** page of your [TalkJS dashboard](https://talkjs.com/dashboard/).
- Copy the entire folder onto your local server webroot (example: `C:\wamp\www`)
- `index.php`
  - User: Chris Pratt, Role: Accountant
  - Visit https://localhost or the webroot from the browser to view the chat instance for this user.
- `Sundar/index.php`
  - User: Sundar, Role: Staff
  - Visit https://localhost/Sundar from the browser to view the chat instance for this user.
- `Admin/index.php`
  - User: Stella, Role: Admin
  - Visit https://localhost/Admin from the browser to view the chat instance for this user.
- `Banned/index.php`
  - User: Matt Wong, Role: Banned
  - Visit https://localhost/Banned from the browser to view the chat instance for this user.

## Initiate First Messages Using The Rest Api

- At first, the chat window will be empty. To get a conversation going between these 4 users, [create a conversation using the REST API](https://talkjs.com/docs/Reference/REST_API/Conversations/) and add these 4 users to the participants list.
- After creating a conversation, [send an initial message from each user to the conversation using the REST API](https://talkjs.com/docs/Reference/REST_API/Messages/).
- Now every users TalkJS instances should start showing up messages.

You are now free to start playing around and apply different filters!
