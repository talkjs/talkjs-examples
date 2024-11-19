# How to create a message center with TalkJS

This is an example project for TalkJS's tutorial on [how to create a message center](https://talkjs.com/resources/how-to-create-a-message-center/).

The project uses TalkJS's [REST API](https://talkjs.com/docs/Features/Customizations/Conversation_Actions/) to create messages and set the user's conversation access to read-only, and then hides the message field of the inbox.

> [!TIP]
> [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/howtos.how-to-create-a-message-center.zip)

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

## How to run the tutorial

1. Clone or [download this project]((https://github.com/talkjs/talkjs-examples/releases/latest/download/howtos.how-to-create-a-message-center.zip)).
2. Replace `<APP_ID>` and `<SECRET_KEY>` in `index.html` and `seed-users.js` with the values found in your [TalkJS dashboard](https://talkjs.com/dashboard/login).
3. Run `npm install` to install dependencies.
4. Run `npm start` to create example users for the demo.
