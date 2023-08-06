This is an example project to go with our tutorial on How to edit the title and image of your TalkJS Conversation.
<!-- Add link to tutorial once published -->

The project uses TalkJS's [conversation actions](https://talkjs.com/docs/Features/Customizations/Conversation_Actions/) to add a custom action to the conversation that lets users edit the title or image of group conversations. The action is hooked to a backend server that calls the TalkJS REST API to update the conversation object.

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- [Node.js](https://nodejs.org/en) and [npm]()

## How to run the tutorial

1. Clone or download this project.
2. Go to the `server` folder and run `npm install` followed by `npm start`. This installs all the required dependencies and starts the NodeJS server.
3. Open `index.html` from a browser, or through an extension like Live Server from your favorite IDE or text editor. 