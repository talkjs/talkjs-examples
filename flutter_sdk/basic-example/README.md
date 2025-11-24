# TalkJS and Flutter example

An example project that shows both the [ChatBox](https://talkjs.com/docs/UI_Components/Flutter/Widgets/Chatbox/) and [ConversationList](https://talkjs.com/docs/UI_Components/Flutter/Widgets/ConversationList/) widgets of TalkJS.

> [!TIP]
> [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/flutter_sdk.basic-example.zip)

## Getting started

The first thing to do is to install all the dependencies with the command:

```bash
flutter pub get
```

This is to be done only once.

After that, change in the `lib/main.dart` file the 'YOUR_APP_ID' string with a valid appId.

Finally, connect an Android/iOS device or emulator and run:

```bash
flutter run
```

to run the example.

## How it works

This example uses the 'provider' package to manage a global app state.

The `MyAppState` class has a `session` and a `conversation` properties, that are used by the ChatBox and ConversationList widgets.

The `conversation` property is in reality a getter and setter pair, in order to call the `notifyListeners()` functions whenever the `conversation` property is changed.

In our `main()` function the TalkJS Session is initialized, and is used as the global app state.

The app has 3 routes:
- '/' contains the buttons to select either a ChatBox or ConversationList
- '/chatbox' is the ChatBox screen, and finally
- '/conversationlist' is the ConversationList screen.

The ChatBoxScreen uses Consumer<MyAppState> in order to get the global session and conversation objects, and be able to rebuild itself whenever the global state changes.

The ConversationList has an event called `onSelectConversation` that is triggered when the user clicks on a conversation. When the event is triggered, a new `Conversation` object is built, using the `id` of the selected conversation, then this object is assigned to the global app state, and finally we navigate to the '/chatbox' route to show a ChatBox widget with the selected conversation.
