# How to add a GIF picker

This is an example project to go with the tutorial on [How to add a GIF picker to your TalkJS chat](https://talkjs.com/resources/how-to-add-a-gif-picker-to-your-talkjs-chat/).

The project uses TalkJS's [action buttons](https://talkjs.com/docs/Features/Customizations/Action_Buttons_Links/) to add a custom action to the message field that lets users add GIFs to their chats. The action is hooked to a backend server that calls the TalkJS REST API to upload the GIF and add it to the conversation.

> [!TIP]
> [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/howtos.how-to-add-a-gif-picker-to-your-talkjs-chat.zip)

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- A [Giphy Developer](https://developers.giphy.com/dashboard/) account and an API key
- [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/)

## How to run the tutorial

1. Clone or [download this project](https://github.com/talkjs/talkjs-examples/releases/latest/download/howtos.how-to-add-a-gif-picker-to-your-talkjs-chat.zip).
2. In your [TalkJS dashboard](https://talkjs.com/dashboard/), navigate to the **Themes** tab. Create a new theme called "gif_picker" based on the "default" theme. Add a custom action button, code, and the required styles from the [tutorial]((https://talkjs.com/resources/how-to-add-a-gif-picker-to-your-talkjs-chat/)). 
3. In the **Chat UI** tab, set the active theme to "gif_picker".
4. Go to the **Settings** tab of your TalkJS dashboard and find your app ID. Add this to line 111 (`<YOUR_APP_ID>`) of your `talkjs-giphy-integration/index.js` file.
5. Sign up for a basic [Giphy Developer](https://developers.giphy.com/dashboard/) account. To get an API key, you must create an app on Giphy and it generates an API key for you. Copy this API key and paste it in line 3 (`<YOUR_GIPHY_API_KEY>`) of your `talkjs-giphy-integration/index.js` file.
6. Go to the `talkjs-giphy-integration` folder and run `npm install` followed by `npm run dev`. This installs the required dependencies for the frontend and runs the app at `localhost:1234`.