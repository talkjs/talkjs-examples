# Buyer-seller chat in React with TalkJS

## Context
This directory contains two buyer-seller marketplace applications: one with and one without chat functionality.

The application without chat functionality serves as a start application for the TalkJS implementation [tutorial](https://talkjs.com/tutorials/article/integrate-buyer-seller-chat-into-a-marketplace-with-react/), in which chat functionalities are being added within a project. The final product of the tutorial is the marketplace application with chat functionality. 

The applications both realize a simplified use case of a marketplace. In this marketplace, users are able to log in, view product listings and chat with the vendor of a product in several different ways (obviously, the chat functionalities are only implemented in the application with chat functionalities).

Both applications have been built in React, with Redux and by using the Container Pattern and TypeScript.

## First things first

### React version
This application has been written in React version 16.5.2.
Make sure to run this application with the aforementioned React version or above to assure it'll function as intended.

### NodeJS version
Make sure you're working with NodeJS v8.11.4 or above.

## Getting started
The following steps should be executed in either the ```marketplace``` or ```marketplace-with-chat``` directory.

- Install all the needed modules by using ```npm install```
- Start the devserver by using ```npm start```
- Navigate to ```http://localhost:3000``` in your preferred browser.
- Log into the application. More information about logging in can be found in the next chapter.

## How to log in
You can use any mock-user's username to log into any of the applications. The mock-users can be found in the following location:
```
src/core/mocks/users.mock.ts
```

## Chat-related files
The following files are all the files in the marketplace application that contain any code regarding the chat implementation:
```
src/index.tsx
src/pages/Inbox/InboxPageContainer.tsx
src/pages/Inbox/InboxPage.tsx
src/pages/Product/ProductPageContainer.tsx
src/pages/UserProfile/UserProfileContainer.tsx
src/pages/Login/LoginContainer.tsx
src/pages/Product/ProductPage.tsx
src/pages/UserProfile/UserProfile.tsx
src/components/Chatbox/Chatbox.tsx
src/components/Inbox/Inbox.tsx
src/shared/models/chat-preferences.model.ts
src/shared/talk/talk-session.ts
src/shared/utils/talk.util.ts
```

## Documentation
For more information on how to integrate TalkJS into your projects, check out our [documentation](https://talkjs.com/docs/?ref=gh-example-readme).
