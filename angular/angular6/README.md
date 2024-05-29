# Buyer-seller chat in Angular 6 with TalkJS

## Context
This directory contains two buyer-seller marketplace applications: one with and one without chat functionality.

The application without chat functionality serves as a start application for the TalkJS implementation [tutorial](https://talkjs.com/tutorials/article/add-buyer-seller-chat-into-a-marketplace-with-angular-6/), in which chat functionalities are being added within a project. The final product of the tutorial is the marketplace application with chat functionality. 

The applications both realize a simplified use case of a marketplace. In this marketplace, users are able to log in, view product listings and chat with the vendor of a product in several different ways (obviously, the chat functionalities are only implemented in the application with chat functionalities).

Both applications have been built in Angular 6.

## First things first

### Angular version
This application has been written in Angular CLI version 6.1.5.
Make sure to run this application with the aforementioned Angular CLI version or above to assure it'll function as intended.

### NodeJS version
Make sure you're working with NodeJS v8.11.4 or above.

## Getting started
The following steps should be executed in either the ```marketplace``` or ```marketplace-with-chat``` directory.

- Install all the needed modules. ```npm install```
- Open `/src/app/core/services/talk.service.ts` and replace YOUR_APP_ID with your own appId which you can find in the [TalkJS dashboard](https://talkjs.com/dashboard).
- Start the devserver. ```npm start```
- Navigate to ```http://localhost:4200``` in your preferred browser.
- Log into the application. More information about logging in can be found in the next chapter.

## How to log in
You can use any mock-user's username to log into any of the applications. The mock-users can be found in the following location:
```
src/app/core/mocks/users.mock.ts
```

## Chat-related files
The following files are all the files in the marketplace application with chat functionality that contain any code regarding the chat implementation:
```
src/app/core/services/talk.service.ts
src/app/core/core.module.ts
src/app/core/authentication/components/login/login.component.ts
src/app/users/components/user-profile/user-profile.component.ts
src/app/products/components/product-page/product-page.component.ts
src/app/chat-inbox/components/inbox/inbox.component.ts
```

## Documentation
For more information on how to integrate TalkJS into your projects, check out our [documentation](https://talkjs.com/docs/?ref=gh-example-readme).
