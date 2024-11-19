# How to mute a conversation

This is an example project for TalkJS's tutorial on [how to mute a conversation](https://talkjs.com/resources/how-to-mute-a-conversation/).

The project uses TalkJS's [custom conversation actions](https://talkjs.com/docs/Features/Customizations/Conversation_Actions/) to add a new "Mute conversation" option to the chat UI. It then listens for this custom action and calls TalkJS's JavaScript SDK to mute notifications for the conversation.

> [!TIP]
> [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/howtos.how-to-mute-a-conversation.zip)

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

## How to run the tutorial

1. Clone or [download this project](https://github.com/talkjs/talkjs-examples/releases/latest/download/howtos.how-to-mute-a-conversation.zip).
2. Go to the **Roles** tab of your TalkJS dashboard. In the **Custom conversation actions** section of the "default" role settings, add a new custom conversation action with a name of "mute" and a label of "Mute conversation".
3. Replace `<APP_ID>` and `<SECRET_KEY>` in `index.html` and `script.js` with the values found in your [TalkJS dashboard](https://talkjs.com/dashboard/login).
4. Run `npm install` to install dependencies.
