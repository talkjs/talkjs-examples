## Team chat example

This example shows you how to use React and TalkJS to create a team chat with channels (like Slack or Teams). It's similar to the [remote work demo](https://talkjs.com/demo/team-chat/) that you can try on our website. See our [How to use TalkJS to create a team chat with channels](https://talkjs.com/resources/how-to-use-talkjs-to-create-a-team-chat-with-channels/) tutorial for more details.

The example uses React version 18. You can use the React SDK with versions 17 and up.

> [!TIP] > [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/react.remote-work-demo.zip)

## Instructions

1. Clone or [download this project](https://github.com/talkjs/talkjs-examples/releases/latest/download/react.remote-work-demo.zip).
2. Install dependencies by either running `npm install` or `yarn`.
3. Create a [TalkJS account](https://talkjs.com/dashboard/signup/).
4. In `talkjsConfig.js`, replace `appId` with your own app ID. You can find your app ID on the **Settings** page of your [TalkJS dashboard](https://talkjs.com/dashboard/).
5. From this point on, you're ready to start up the app using using either `npm run` or `yarn start`. The app will be up and running at localhost:3000.

The app is prepopulated with a default user and a couple of hardcoded conversations, which easily can be replaced with your own users and conversations. You can find these conversations and the default `userId` in `src/talkJsConfig.js` as well.
