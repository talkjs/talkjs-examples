# TalkJS and Android basic example

This code shows how you can embed TalkJS into a WebView using Android. The app itself is a minimal WhatsApp clone with a hardcoded contact list.

It shows off three use cases:
- Show a conversation list (the "inbox")
- Continue a conversation
- Start a new conversation

How it works, in brief:
1. When the Inbox (`InboxTab`) is opened, a webview is created which runs the JS code in `asserts/chat.js`, which is generic for all three use cases
2. The JS code calls back into the app via `JavascriptCallbacks.getOptions` to determine what to do (open an inbox, start a chat with somebody, etc). Then, it calls TalkJS SDK methods as described in the [TalkJS docs](https://talkjs.com/docs).
3. When a user clicks on a conversation in the inbox, an intent is generated to navigate to the `ChatboxActivity`, which reuses the code above to display a chatbox of a single conversation, instead of a conversation list.

> [!TIP]
> [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/android.basic-example.zip)
