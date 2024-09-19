## Intro

This example shows you how to use React and TalkJS to create a team chat with channels and reply threads (like Slack or Teams). It's similar to our [remote work demo](https://talkjs.com/demo/team-chat/) that you can try on our website.

<!-- See our [How to add reply threads to your TalkJS team chat]() tutorial for more details. -->

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)
- [ngrok](https://ngrok.com/)

## Instructions

1. Clone or download the project
1. Start ngrok with `ngrok http 3001`. You should see a forwarding URL which is something like `https://<YOUR_URL>.ngrok-free.app`
1. In the TalkJS dashboard:
   1. In the **Themes** tab:
      1. Clone the `team_chat` theme to create a new `threads_chat` theme
      1. Select to **Edit** `threads_chat` and replace the `UserMessage` template with the version in `themes/UserMessage.txt`.
   1. In the **Chat UI** tab:
      1. Select **Edit role** and create a new `threads_user` role
      1. Select the `threads_user` role and select to use the `threads_chat` theme
      1. Under **Built-in message actions**, select "None" for the **Reply** action
      1. Under **Custom message actions**, create a new action with a name of "replyInThread" and a label of "Reply in thread", available to all messages for users with write permission
   1. In the **Settings** tab under **Webhooks**:
      1. enable the "message.sent" option.
      1. Add the ngrok URL to **Webhook URLs** in the TalkJS dashboard, adding `/updateReplyCount`: `https://<YOUR_URL>.ngrok-free.app/updateReplyCount`
1. Inside the `/backend` directory:
   1. Replace `<APP_ID>` and `<SECRET_KEY>` in `server.js` with the values found in the **Settings** tab of your [TalkJS dashboard](https://talkjs.com/dashboard/login).
   1. Install dependencies by running `npm install`
   1. Start the server with `npm run`
1. Inside the `/src` directory:
   1. Replace `<APP_ID>` in `talkjsConfig.js` with the value found in the **Settings** tab of your [TalkJS dashboard](https://talkjs.com/dashboard/login)
   1. Install dependencies by either running `npm install`
   1. Start the app with `npm run`

You can now view your app at localhost:3000.

The app is prepopulated with a default user and a couple of hardcoded conversations, which easily can be replaced with your own users and conversations. You can find these conversations and the default `userId` in `src/talkJsConfig.js` as well.
