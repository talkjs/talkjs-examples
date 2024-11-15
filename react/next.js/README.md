# Next.js example

This is a minimal example that demonstrates how to integrate TalkJS into a Next.js project using our [React SDK](https://talkjs.com/docs/Reference/React_SDK/Installation/).

The React SDK is not able to render components on the server, so we use Next.js's [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components) to render them on the client.

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

## How to run the tutorial

1. Clone or download the project.
2. Copy `.env.example` to a new `.env` file.
3. Replace `<APP_ID>` in `.env` with the value found in the **Settings** tab of your [TalkJS dashboard](https://talkjs.com/dashboard/login).
4. Run `npm install` to install dependencies.
5. Run `npm run dev` to start the server.
6. Visit <http://localhost:3000>.

You should see a page which loads a chatbox on startup.
