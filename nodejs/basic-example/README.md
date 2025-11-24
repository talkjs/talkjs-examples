# TalkJS and Node.js backend example

This is an example project for TalkJS's tutorial on [how to build a Node.js chat app with TalkJS](https://talkjs.com/resources/how-to-add-chat-into-a-nodejs-app-with-talkjs/).

This example demonstrates how to integrate TalkJS with an application that has a Node.js backend. There are two projects inside the repo:

- The `talkjs-backend` project contains the Node.js backend, which serves a REST endpoint with user data.
- The `talkjs-frontend` project contains the frontend code, which uses TalkJS's [classic JavaScript SDK](https://talkjs.com/docs/UI_Components/JavaScript/Classic/) to create chats between users.

> [!TIP]
> [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/nodejs.basic-example.zip)

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- [Node.js](https://nodejs.org/en/download/package-manager/current)

## How to run the tutorial

1. Clone or [download this project](https://github.com/talkjs/talkjs-examples/releases/latest/download/nodejs.basic-example.zip).
1. From the `talkjs-backend` directory:

   1. Run `npm install` to build the project
   1. Run `npm start` to start the server and add test users to the database

1. From the `talkjs-frontend` directory:
   1. Replace `<APP_ID>` in `script.js` with the value found in the **Settings** tab of your [TalkJS dashboard](https://talkjs.com/dashboard/login).
   1. Open `index.html` from a browser, or through an extension like VS Code's Live Server, to view the app
