# How to listen for unread messages

This example shows you how to get the current user's unread messages with [`Session.unreads`](https://talkjs.com/docs/UI_Components/JavaScript/Classic/Session/#Session__unreads).

TalkJS already displays an [unread message counter](https://talkjs.com/resources/unread-message-counter/) next to conversations with unread messages, but you might want to add a counter elsewhere in your UI. See our [Browser notifications](https://talkjs.com/docs/Features/Notifications/Browser_Notifications/#a-notifier-badge-in-your-navigation-bar) docs for more details.

> [!TIP] > [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/howtos.how-to-listen-for-unread-messages.zip)

## How to run the example

- Replace `<YOUR_APP_ID>` in `index.html` and `other.html` with your App ID. You can find this in the **Settings** tab of your [TalkJS dashboard](https://talkjs.com/dashboard)
- Open `index.html` and `other.html` in your browser.
- Test it out:
  - Switch to a different conversation in Alice's inbox (you should have sample conversations available)
  - Switch tabs and some messages to the conversation in Sebastian's inbox
  - Go back to Alice's inbox. You should see that the count of unread messages has increased.
