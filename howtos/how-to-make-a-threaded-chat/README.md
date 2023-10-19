This is an example project for TalkJS's tutorial on [how to make a comment section with threaded replies](https://talkjs.com/resources/how-to-build-a-reply-thread-feature-with-talkjs/).

This project uses action buttons and the REST API to add a custom reply option that opens a new conversation for replies, and a back button to navigate back to the original message. It also uses a webhook to listen for new messages and updates the reply action button to show the number of replies.

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

## How to run the tutorial

1.  Clone or download the project.
2.  Run `npm install` to install dependencies.
3.  Run `npm start` to start the server.
4.  Remove the default "Reply" message action:
    1. Go to the **Roles** tab of the TalkJS dashboard.
    2. Select the "default" role.
    3. In **Actions and permissions** > **Built-in message actions**, set **Reply** to **None**.
5.  Add a "Reply" action button to the user message styling of your theme following [the tutorial instructions](https://talkjs.com/resources/how-to-build-a-reply-thread-feature-with-talkjs/#add-the-reply-button-to-your-theme)
6.  Add a "Back" action button to the chat header of your theme following [the tutorial instructions](https://talkjs.com/resources/how-to-build-a-reply-thread-feature-with-talkjs/#add-the-back-button-to-your-theme)
7.  Set up a webhook to respond to new message events:
    1. Go to the **Settings** tab of the TalkJS dashboard.
    2. Enable the `message.sent` option in the **Webhooks** section of the TalkJS dashboard.
    3. Start ngrok with `ngrok http 3000`.
    4. Add the ngrok URL to **Webhook URLs** in the TalkJS dashboard, including the `updateReplyCount` path: `https://<YOUR-URL>.ngrok.io/updateReplyCount`
