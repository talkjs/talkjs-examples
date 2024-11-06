This is an example project for TalkJS's tutorial on [How to integrate Google's Gemini into your TalkJS chat](https://talkjs.com/resources/create-a-chatbot-with-talkjs-and-gemini/). The project uses TalkJS webhooks to listen for new message events from the TalkJS server, calls the Gemini API to generate a message reply, and then adds the reply to the conversation with the TalkJS API.

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- A [Gemini API account](https://ai.google.dev/gemini-api) and [API key](https://ai.google.dev/gemini-api/docs/api-key)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)
- [ngrok](https://ngrok.com/)

## How to run the tutorial

1. Clone or download the project.
2. Replace `<APP_ID>` and `<TALKJS_SECRET_KEY>` in `index.html` and `server.js` with the values found in your [TalkJS dashboard](https://talkjs.com/dashboard/login).
3. Replace `<GEMINI_SECRET_KEY>` with your Anthropic API key
4. Enable the `message.sent` option in the **Webhooks** section of the TalkJS dashboard.
5. Start ngrok with `ngrok http 3000`.
6. Add the ngrok URL to **Webhook URLs** in the TalkJS dashboard.
7. Run `npm install` to install dependencies.
8. Run `npm start` to start the webhooks server.
