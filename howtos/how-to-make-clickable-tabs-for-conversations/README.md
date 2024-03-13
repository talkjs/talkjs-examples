This is an example project for TalkJS's tutorial on how to make clickable tabs for conversations.

The project uses TalkJS's [custom message actions
](https://talkjs.com/docs/Reference/JavaScript_Chat_SDK/Chatbox/#Chatbox__onCustomMessageAction) to add a new "Open Tab" option to each message a user sends in the chatbox UI. If the "Open Tab" option is clicked for a given message, a tab gets created and the chatbox switches to a private conversation between you and the user who sent the message. Use these new tabs to navigate between conversations.

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

## How to run the tutorial

1. Clone or download the project.
2. Go to the **Roles** tab of your TalkJS dashboard. In the **Custom message actions** section of the "default" role settings, add a new custom conversation action with a name of "openTab" and a label of "Open Tab".
3. Replace `<APP_ID>` and `<SECRET_KEY>` in `index.html` and `seed-users.js` with the values found in your [TalkJS dashboard](https://talkjs.com/dashboard/login).
4. Run `npm install` to install dependencies.
5. Run `npm start` to create example users for the demo.
6. Open the index.html file.
