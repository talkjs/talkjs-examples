# Next.js and TalkJS example

This example accompanies our [Add chat to a Next.js app with TalkJS](https://talkjs.com/resources/add-chat-to-a-nextjs-app-with-talkjs/) tutorial. It demonstrates how to integrate TalkJS into a Next.js project using our [React SDK](https://talkjs.com/docs/Reference/React_SDK/Installation/).

The React SDK is not able to render components on the server, so we use Next.js's [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components) to render them on the client.

This example uses React version 18.

> [!TIP] > [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/react.next.js.zip)

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

## How to run the tutorial

1. Clone or [download this project](https://github.com/talkjs/talkjs-examples/releases/latest/download/react.next.js.zip).
2. Save a copy of `.env.example` as `.env` and replace `<APP_ID>` with the value found in the **Settings** tab of your [TalkJS dashboard](https://talkjs.com/dashboard/login).
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the server.
5. Visit <http://localhost:3000>.

You should see a page which loads a chatbox on startup.
