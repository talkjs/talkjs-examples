This is an example project for TalkJS's tutorial on how to make a comment section with threaded replies.

!! expand...

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

## How to run the tutorial

1. Clone or download the project.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the server.
4. Remove the default "Reply" message action:
   1. Go to the **Roles** tab of the TalkJS dashboard.
   2. Select the "default" role.
   3. In **Actions and permissions** > **Built-in message actions**, set **Reply** to **None**.
5. Add a "Reply" action button to the user message styling of your theme:
   1. Go to the **Themes** tab of the TalkJS dashboard.
   2. Select to **Edit** the theme you use for your "default" role.
   3. In the list of **Built-in Components**, select **UserMessage**.
   4. Add the following line below the `<MessageBody />` component:
      ```
      <ActionButton t:if="{{ custom.replyCount > 0 }}" action="replyInThread">Replies ({{ custom.replyCount }})</ActionButton>
      <ActionButton t:else action="replyInThread">Reply</ActionButton>
      ```
   5. If you are in Live mode, select **Copy to live**.
6. Add a "Back" action button to the chat header of your theme:
   1. Go to the **Themes** tab of the TalkJS dashboard.
   2. Select to **Edit** the theme you use for your "default" role.
   3. In the list of Built-in Components, select **ChatHeader**.
   4. Find the code for displaying the user's name in the header (something like `<span>{{user.name}}</span>`) and replace it with the following:
      `<span><ActionButton action="back">&lt; Back</ActionButton>{{user.name}}</ActionButton></span>`
   5. If you are in Live mode, select **Copy to live**.
7. Set up a webhook to respond to new message events:
   1. Go to the **Settings** tab of the TalkJS dashboard.
   2. Enable the `message.sent` option in the **Webhooks** section of the TalkJS dashboard.
   3. Start ngrok with `ngrok http 3000`.
   4. Add the ngrok URL to **Webhook URLs** in the TalkJS dashboard, including the `updateReplyCount` path: `https://<YOUR-URL>.ngrok.io/updateReplyCount`
