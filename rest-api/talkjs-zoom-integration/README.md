This is an example project for integrating Zoom with TalkJS.

The project uses TalkJS's [custom headers](https://talkjs.com/docs/Features/Customizations/Creating_Custom_Headers/) to add a new header with a button to start Zoom meetings from the chat. The button is hooked to a backend server that calls the Zoom API to create a meeting and also sends a message to the chat with the details of the meeting.

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- A [Zoom account](https://zoom.us/signup)
- [Node.js](https://nodejs.org/en)

## How to run the tutorial

1. Clone or download this project.
2. Go to the `server` folder and run `npm start`. This starts the NodeJS server.
3. Open `index.html` from a browser, or through an extension like Live Server from your favorite IDE or text editor. 