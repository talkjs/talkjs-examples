# How to add a 'delete conversation' option to TalkJS

This is an example project for TalkJS's tutorial on [how to delete a conversation](https://talkjs.com/resources/how-to-delete-a-conversation/).

The project uses TalkJS's [custom conversation actions](https://talkjs.com/docs/Features/Customizations/Conversation_Actions/) to add a new "Delete conversation" option to the chat UI. It then listens for this custom action and sends the conversation ID to the backend server, which calls TalkJS's REST API to delete the conversation.

> [!TIP]
> [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/howtos.how-to-delete-a-conversation.zip)

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

## How to run the tutorial

1. Clone or [download this project](https://github.com/talkjs/talkjs-examples/releases/latest/download/howtos.how-to-delete-a-conversation.zip).
2. Go to the **Chat UI** tab of your [TalkJS dashboard](https://talkjs.com/dashboard/). In the **Custom conversation actions** section of the 'default' role settings, add a new custom conversation action with a name of "delete" and a label of "Delete conversation".
3. Replace `<APP_ID>` and `<SECRET_KEY>` in `index.html` and `server.js` with the values found in your [TalkJS dashboard](https://talkjs.com/dashboard/login).
4. Run `npm install` to install dependencies.
5. Run `npm start` to start the server.
