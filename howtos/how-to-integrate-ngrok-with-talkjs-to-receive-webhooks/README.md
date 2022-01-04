+ [Read it on our blog](https://talkjs.com/resources/how-to-integrate-ngrok-with-talkjs-to-receive-webhooks-locally/)
+ [Read it on dev.to](https://dev.to/talkjs/how-to-integrate-ngrok-with-talkjs-to-receive-webhooks-locally-523f)
## Project Setup

+ Replace the APP_ID in script.js with your own APPID
+ Open up your TalkJS Dashboard and scroll down to the webhooks section. Select the webhooks you want to receive.
+ Start server.js and use ngrok to expose the port 
+ Copy the server URL from ngrok console to the TalkJS Dashboard
+ Now, you should be able to receive webhooks based on events to your local server
