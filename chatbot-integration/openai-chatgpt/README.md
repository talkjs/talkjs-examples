# How to integrate a chatbot into your TalkJS chat with the OpenAI API

This is an example project for TalkJS's tutorial on [How to integrate a chatbot into your TalkJS chat with the OpenAI API](https://talkjs.com/resources/how-to-make-a-customizable-chatbot-frontend-with-talkjs-and-the-openai-api/).

The project uses TalkJS webhooks to listen for new message events from the TalkJS server, calls the OpenAI API to generate a message reply, and then adds the reply to the conversation with the TalkJS API.

> [!TIP]
> [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/chatbot-integration.openai-chatgpt.zip)

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- An [Open AI account](https://platform.openai.com/signup) and [API key](https://platform.openai.com/account/api-keys)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)
- [ngrok](https://ngrok.com/)

## How to run the tutorial

1. Clone or [download this project](https://github.com/talkjs/talkjs-examples/releases/latest/download/chatbot-integration.openai-chatgpt.zip).
2. Replace `<APP_ID>` and `<TALKJS_SECRET_KEY>` in `index.html` and `server.js` with the values found in your [TalkJS dashboard](https://talkjs.com/dashboard/login).
3. Replace `<OPENAI_SECRET_KEY>` with your OpenAI API key
4. Enable the `message.sent` option in the **Webhooks** section of the TalkJS dashboard.
5. Start ngrok with `ngrok http 3000`.
6. Add the ngrok URL to **Webhook URLs** in the TalkJS dashboard.
7. Run `npm install` to install dependencies.
8. Run `npm start` to start the webhooks server.
