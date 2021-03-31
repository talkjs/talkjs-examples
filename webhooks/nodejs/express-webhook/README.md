# Webhooks example (node.js)
This example demonstrates how the [webhooks feature](https://talkjs.com/docs/Reference/Webhooks.html)  can be used so that additional functionality can be added to your TalkJS enabled applications. For more information check out [TalkJS.com](https://talkjs.com/) or [get in touch](https://talkjs.com?chat).

## Installation

First start by cloning the example repository and changing the working directory to the project folder:

    git clone https://github.com/talkjs/talkjs-examples.git
    cd talkjs-examples/webhooks/nodejs/express-webhook

And lastly, install the required npm packages:

    npm install

## Initial setup
The example requires you to set your  application ID in the a `.env` file. Visit the [TalkJS dashboard](https://talkjs.com/dashboard/) and copy your development `appId` to the `example.env` file and then rename the file to '`.env`'.

Additionally, a secret key must be set to allow TalkJS's [identity verification](https://talkjs.com/docs/Features/Identity_Verification.html) and [webhook integrity](https://talkjs.com/docs/Features/Security_Settings/Security_Recommendations.html#page_Webhook_Integrity) features to work.

*Optional:* A port can be specified to override the default port (3000) that the application runs on.

The `.env` file should look similar to the following:

    APPID=abc123
    SECRET=secretvalue
    PORT=3000

## Getting started

Once the example has been installed and configured the application can be started using:

    npm start

You should see something similar to this in the console:


![console view](https://firebasestorage.googleapis.com/v0/b/klets-3642/o/user_files%2FHku1c4Pt%2Fd919b03062514e8b99ceb9f7d4286aae%2Fconsole.png?alt=media)


Once the application has started, copy the `Webhook URL` to the webhook setting in your TalkJS [dashboard](https://talkjs.com/dashboard/).


The application should now be temporarily accessible online by using [ngrok](https://ngrok.com/), a tool used to temporarily create a tunnel between your local development app and a public URL so that TalkJS can send the webhook events to your local development environment.

## Features

**Inspect requests** that are sent to the demo webhook endpoint by opening the Ngrok inspector (http://127.0.0.1:4040) once the application has started.
![Ngrok inspector](https://firebasestorage.googleapis.com/v0/b/klets-3642/o/user_files%2FHku1c4Pt%2F20ec0a898fe845d4b3326d49ac942fac%2Fngrok.png?alt=media)

**Trigger events using  the demo UI** - The example has a demo chat application to easily trigger events such as `user.created`, `message.send` and `message.read`.
![Demo UI example](https://firebasestorage.googleapis.com/v0/b/klets-3642/o/user_files%2FHku1c4Pt%2F8bd6d9e3d4604becb1fcdb7406e0c872%2Fdual.gif?alt=media)

**Easily prototype event handlers** - Event handlers can easily be prototyped, triggered and testing all without restarting the server due to live-reloading. A list of all the event handlers can be found on the [webhooks section](https://talkjs.com/docs/Webhooks/Getting_Started.html) of the documentation

## App Strcture
Important files
`./app.js` - The main application file which initiates express and sets the route-handlers and a middleware.

`./routes/` - Contains two files used to seperate the routes from the main app.js.

`./controllers/` - There are two controllers, one to handle the webhooks and one to display the demo chat UI.

`./models` - Contains a single mock User model

`.env` - Used to store environment variables for the demo application

`./bin/www` - Used to start the express.js server

`./bin/ngrok` - Used to create an Ngrok tunnel between the demo app and the internet

`./views` - Contains two views using the handlebars view engine:
* `chat.hbs` - A single inbox view with the option to swap to another User's inbox (to trigger read notifications etc.)
* `dual-chat.hbs` - Contains two inbx UI's, with different users for each one. This helps to demonstrate the real-time nature of TalkJS

## Need help?
If you need help, check out the TalkJS [documentation](https://talkjs.com/docs/) or feel free to [talk with us](https://talkjs.com/?chat) or send us an [email](mailto:hey@talkjs.com).
