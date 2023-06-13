This is an example project for TalkJS's tutorial on how to mark a conversation as answered.

The project uses TalkJS webhooks to listen for new message events from the TalkJS server, and then calls the REST API to add a custom `answered` field with a value of `true` to conversations where the latest message is from support, and `false` otherwise. It then filters the inbox to only show unanswered messages.

## How to run the tutorial

1. Clone or download the project.
1. Replace `<APP_ID>` and `<SECRET_KEY>` in `index.html` and `server.js` with the values found in your [TalkJS dashboard](https://talkjs.com/dashboard/login).
1. Enable the `message.sent` option in the **Webhooks** section of the TalkJS dashboard.
1. Add "support" and "customer" roles in the **Roles** tab of the TalkJS dashboard.
1. Install [ngrok](https://ngrok.com/) if you haven't already.
1. Start ngrok with `ngrok http 3000`.
1. Add the ngrok URL to **Webhook URLs** in the TalkJS dashboard.
1. Install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) if you haven't already.
1. Run `npm install` to install dependencies.
1. Run `npm start` to start the webhooks server.
