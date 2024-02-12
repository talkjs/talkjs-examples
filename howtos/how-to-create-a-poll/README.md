This is an example project on how to create a poll with TalkJS.

This project uses [HTML Panels](https://talkjs.com/docs/Features/Customizations/HTML_Panels/) to allow you to display a HTML document in your chats, just above the message field. We’ll use a panel to display the results of a poll, where users voted using custom action buttons. The question in this poll is sent as a System Message. This System Message is created through a call to a backend server through TalkJS’s REST API.


## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

## How to run the tutorial

1. Clone or download the project.
2. Replace `<APP_ID>` and `<SECRET_KEY>` in `index.html` and `server.js` with the values found in your [TalkJS dashboard](https://talkjs.com/dashboard/login).
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the server.
5. Navigate to localhost:3000 in your broswer.
6. Vote using the poll button and click End Poll to view the results.
