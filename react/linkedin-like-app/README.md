# LinkedIn-like messaging app with React and TalkJS

This directory contains an files for an application that emulates the messaging part of LinkedIn. It serves to show how Chat can be integrated into an application using TalkJS.

The app consists three parts:
- **Login:** This is the entry point of the app, where the basic data of the current user is collected
- **My Network:** This is similar to the "My Network" of LinkedIn. It displays a list of users. Each user has a "Message" button which you can use to start a conversation with the user. On click of the "Message button", a chatbox pops up to the right of the screen just like it is on LinkedIn
- **Messaging:** This is similar to the Messaging part of the LinkedIn app. All conversations a user has with other users appear here.

> [!TIP]
> [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/react.linkedin-like-app.zip)

## Requirements

To get this app running on your system, ensure that you are working with Node >= version 6 and npm >= version 5.2.

## Getting started

Here are the steps to get this app running on your system.
- Clone or [download this project](https://github.com/talkjs/talkjs-examples/releases/latest/download/react.linkedin-like-app.zip).
- Run `npm install`.
- In the `Messaging.js` file, replace "MY_APP_ID" on line 30 with your app ID from the **Chat UI** tab of your TalkJS dashboard at https://talkjs.com/dashboard/login. Do the same thing in the `MyNetwork.js` file on line 25.
- Run `npm start`.

### More information

For more information on how to integrate TalkJS into your projects, check out the [TalkJS documentation](https://talkjs.com/docs).


