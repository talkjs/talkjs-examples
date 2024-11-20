# How to integrate ngrok and TalkJS to receive webhooks locally

This example project accompanies the tutorial: [How to integrate ngrok and TalkJS to receive webhooks locally](https://talkjs.com/resources/how-to-integrate-ngrok-with-talkjs-to-receive-webhooks-locally/).

> [!TIP]
> [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/howtos.how-to-integrate-ngrok-with-talkjs-to-receive-webhooks.zip)

## Project setup

+ Replace the `APP_ID` in `script.js` with your own app ID. You can find your app ID on the **Settings** page of your [TalkJS dashboard](https://talkjs.com/dashboard/).
+ Open up your TalkJS dashboard and scroll down to the webhooks section. Select the webhooks you want to receive.
+ Start `server.js` and use ngrok to expose the port. 
+ Copy the server URL from ngrok console to the TalkJS Dashboard.
+ Now, you should be able to receive webhooks based on events to your local server.
