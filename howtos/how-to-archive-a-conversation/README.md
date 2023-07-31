This is an example project for TalkJS's tutorial on [how to archive a conversation]().

The project uses TalkJS's [custom conversation actions](https://talkjs.com/docs/Features/Customizations/Conversation_Actions/) to add a new "Archive conversation" option to the chat UI. It then listens for this custom action and sends the conversation ID to the backend server, which calls TalkJS's REST API to delete the conversation.

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)
- [ngrok](https://ngrok.com/)

## How to run the tutorial

1. Clone or download the project.
2. Go to the **Roles** tab of your TalkJS dashboard. In the **Custom conversation actions** section of the "default" role settings, add a new custom conversation action with a name of "archive" and a label of "Archive conversation".
3. Start ngrok with `ngrok http 3000`.
4. Add the ngrok URL to **Webhook URLs** in the TalkJS dashboard.
5. Enable the `message.sent` option in the **Webhooks** section of the TalkJS dashboard.
6. Replace `<APP_ID>` and `<SECRET_KEY>` in `index.html` and `server.js` with the values found in your [TalkJS dashboard](https://talkjs.com/dashboard/login).
7. Run `npm install` to install dependencies.
8. Run `npm start` to start the server.
