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
2. Go to your TalkJS dashboard and navigate to the Themes tab. Create a new theme called "gif_picker" based on the "default" theme. Add a custom action button, code, and the required styles from the tutorial. Go back to the Roles tab and set the UI Theme to "gif_picker". Don’t forget to click **Save all roles** to persist your changes.
3. Sign up for a basic [Giphy Developer](https://developers.giphy.com/dashboard/) account. To get an API key, you must create an app on Giphy and it generates an API key for you. Copy this API key and paste it in Line 3 (`<YOUR_GIPHY_API_KEY>`) of `talkjs-giphy-integration/index.js` file.
4. Go to the `talkjs-giphy-integration` folder and run `npm install` followed by `npm run dev`. This installs the required dependencies for the frontend and runs the app at `localhost:1234`.