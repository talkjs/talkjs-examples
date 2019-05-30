# Messaging app in React Native with TalkJS

## Context
This directory contains two applications: one with and one without chat functionality.

The application without chat functionality (```base-app```) serves as a start application for the TalkJS implementation [tutorial](https://talkjs.com/tutorials/article/creating-a-messaging-app-using-talkjs-chat-api-and-react-native/), in which chat functionalities are being added within a project. The final product of the tutorial is a messaging app with working chat functionality. 

Both applications have been built in React Native.

## First things first

### React Native version
This application has been written in React Native CLI version 2.0.1 and React Native version 0.57.4.
Make sure to run this application with the aforementioned React Native version or above to assure it'll function as intended.

### NodeJS version
Make sure you're working with NodeJS v10.13.0 or above.

## Getting started
The following steps should be executed in either the ```base-app``` or ```messaging-app``` directory.

- Install all the needed modules. ```npm install```
- Open `/app/shared/utils/talk.util.ts ` and replace YOUR_APP_ID with your own appId which you can find in the [TalkJS dashboard](https://talkjs.com/dashboard).
- For Apple devices, start the application on either your mobile device or an emulator as you normally would with a React Native application.
- For Android devices, to start the application on your mobile device, use ```npm run start-android-device```. To start it on an emulator, use ```npm run start-android-emulator```

## How to log in
You can use any mock-user's username to log into any of the applications. The mock-users can be found in the following location:
```
app/core/mocks/users.mock.ts
```

## Chat-related files
The following files are all the files in the messaging application with chat functionality that contain any code regarding the chat implementation:
```
app/screens/CreateChat/CreateChatScreenContainer.native.tsx
app/screens/ChatInbox/ChatInboxScreenContainer.native.tsx
app/components/TalkInbox/TalkInbox.native.tsx
app/components/TalkInbox/talkjs-container.html
app/shared/utils/talk.util.ts
app/shared/store/actions/talk.actions.ts
app/shared/store/reducers/talk.reducer.ts
app/shared/store/store.ts
```

## Documentation
For more information on how to integrate TalkJS into your projects, check out our [documentation](https://talkjs.com/docs/?ref=react-native-example-readme).
