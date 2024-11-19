# How to mark a conversation as answered

This is an example project for TalkJS's tutorial on [how to mark a conversation as answered](https://talkjs.com/resources/how-to-mark-a-conversation-as-answered/).

The project uses TalkJS webhooks to listen for new message events from the TalkJS server, and then calls the REST API to add a custom `answered` field with a value of `true` to conversations where the latest message is from support, and `false` otherwise. It then filters the inbox to only show unanswered messages.

> [!TIP]
> [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/howtos.how-to-mark-a-conversation-as-answered.zip)

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)
- [ngrok](https://ngrok.com/)

## How to run the tutorial

1. Clone or [download this project]((https://github.com/talkjs/talkjs-examples/releases/latest/download/howtos.how-to-mark-a-conversation-as-answered.zip)).
2. Replace `<APP_ID>` and `<SECRET_KEY>` in `index.html` and `serer.js` with the values found in your [TalkJS dashboard](https://talkjs.com/dashboard/login).
3. Enable the `message.sent` option in the **Webhooks** section of the TalkJS dashboard.
4. Add "support" and "customer" roles in the **Roles** tab of the TalkJS dashboard.
5. Start ngrok with `ngrok http 3000`.
6. Add the ngrok URL to **Webhook URLs** in the TalkJS dashboard.
7. Run `npm install` to install dependencies.
8. Run `npm start` to start the webhooks server.
