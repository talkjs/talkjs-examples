This is an example project of TalkJS's tutorial on how to make a clickable avatar that links to the user’s profile.

This project uses TalkJS's [custom header feature](https://talkjs.com/docs/Features/Customizations/Creating_Custom_Headers/). The custom header in this example contains a link that leads to user's profile page. 

The data is fetched from ExpressJS server that returns the list of users, the information about the current user and the current template. 

## Prerequisites

To run this tutorial, you will need: 

- A [TalkJS account](https://talkjs.com/dashboard/login)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

## How to run the tutorial

1. Clone or download the project
2. Replace `<APP_ID>` in `server.js` with the value found in your [TalkJS dashboard](https://talkjs.com/dashboard/login).
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the server.