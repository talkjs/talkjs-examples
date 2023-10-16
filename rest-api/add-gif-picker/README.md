This is an example project to go with our tutorial on How to add a GIF picker to your TalkJS chat.

<!-- Add link to tutorial once published -->

The project uses TalkJS's [Action Buttons](https://talkjs.com/docs/Features/Customizations/Action_Buttons_Links/) to add a custom action to the message field that lets users add GIFs to their chats. The action is hooked to a backend server that calls the TalkJS REST API to upload the GIF and add it to the conversation.

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- A [Giphy Developer](https://developers.giphy.com/dashboard/) account and an API key
- [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/)

## How to run the tutorial

1. Clone or download this project.
2. Go to your TalkJS dashboard and navigate to the Themes tab. Create a new theme called "gif_picker" based on the "default" theme. Add a custom action button and the required styles from the tutorial. Go back to the Roles tab and set the UI Theme to "gif_picker". Don’t forget to click Save all roles to persist your changes.
3. Go to the project folder and run `npm install`. This installs all the required dependencies.
4. Go to the `server` folder and run `npm install` followed by `npm start`. This installs all the required dependencies and starts the NodeJS server.
5. Rename the `.env_new` file to `.env` and paste your TalkJS appID and secret key. You can find both of these on your TalkJS dashboard.
6. Go to the `talkjs-giphy-integration` folder and run `npm install` followed by `npm run dev`. This installs the required dependencies for the frontend and runs the app at `localhost:1234`.
