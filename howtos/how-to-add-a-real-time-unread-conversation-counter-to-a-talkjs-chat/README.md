# How to add a real-time unread conversation counter to a TalkJS chat

This example project accompanies the tutorial: [How to add an unread conversation counter to TalkJS](https://talkjs.com/resources/how-to-add-a-real-time-unread-conversation-counter-to-a-talkjs-chat/).

> [!TIP]
> [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/howtos.how-to-add-a-real-time-unread-conversation-counter-to-a-talkjs-chat.zip)

## Project setup

- `index.php` is a basic HTML page with a TalkJS instance.
- Replace the `APP_ID` in each `index.php` with your own app ID, which you can find on the **Settings** page of your [TalkJS dashboard](https://talkjs.com/dashboard/).
- Copy `index.php` to your local server webroot (example: `C:\wamp\www`)
- Visit `<https://localhost>` or the webroot from the browser to view the chat instance for this user.

## Initiate first messages using the TalkJS REST API

- You can better understand this demo with multiple users chatting with each other. For that reason, create another `index.php` (`user1/index.php`) and replace the user ID with a different one. You can create multiple Talkjs instances like this.
- Once you have your instances ready, get a [conversation going between these users using the REST API](https://talkjs.com/docs/Reference/REST_API/Conversations/).
- After creating a conversation, send an initial [message from each user to the conversation using the REST API](https://talkjs.com/docs/Reference/REST_API/Messages/).
- Now, your TalkJS instances should start showing messages.
- Create multiple different conversations to better understand how the unread counter works.
