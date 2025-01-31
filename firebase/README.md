## How to send web push notifications to a browser with Firebase

This example project shows you how to send TalkJS's web push notifications to a browser with Firebase.

> [!TIP] > [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/firebase.notifications-example.zip)

## Prerequisites

To run this example project, you need:

- The [Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli)
- A [TalkJS account](https://talkjs.com/dashboard/login)

## How to run the example

1. Clone or [download this project](https://github.com/talkjs/talkjs-examples/releases/latest/download/firebase.notifications-example.zip).
1. In the root directory of the project, run:
   ```sh
   firebase login
   ```
   if you are not already logged in, and log in to your account
1. Set up Firebase hosting:
   ```sh
   firebase init hosting
   ```
   Select to either use an existing Firebase project or create a new one. If you create a new one, or you haven't yet set up Firebase Cloud Messaging in the TalkJS dashboard, see [Configure Firebase Cloud Messaging](https://talkjs.com/docs/Features/Notifications/Mobile_Push_Notifications/Configure_FCM/) in our docs.
1. Answer the prompted questions:
   1. Select to use the default (`public`) as your public directory
   1. Select Yes for "Configure as a single-page app?"
   1. Choose whether to set up automatic builds and deploys with GitHub
   1. Select No for "File public/index.html already exists. Overwrite?"
1. Once initialization is complete, open the [Firebase console](http://console.firebase.google.com/) and select your project.
1. On the **Project Overview** page, click the **+** icon to add a new app. For the platform, select **Web**.
1. Pick a name for your app.
1. After registering the app name, you will see some code samples for adding the Firebase SDK. Copy the `firebaseConfig` JavaScript object. It will look something like this:
   ```json
   {
     "apiKey": "<FIREBASE_API_KEY>",
     "authDomain": "<FIREBASE_APP_NAME>.firebaseapp.com",
     "projectId": "<FIREBASE_APP_NAME>",
     "storageBucket": "<FIREBASE_APP_NAME>.firebasestorage.app",
     "messagingSenderId": "<SENDER_ID>",
     "appId": "<FIREBASE_APP_ID>"
   }
   ```
1. Inside `public/index.html` (lines 168-175) and `public/firebase-messaging-sw.js` (lines 9-16), replace the placeholder object with your `firebaseConfig` object.
1. In the Firebase console, click the gear icon and go to **Project Settings**. In the **Cloud Messaging** tab, go to the **Web configuration section** and then click **Generate Key Pair**.
1. Copy the value under “Key Pair”. This is the public key used to encrypt web push notifications.
1. Inside `public/index.html` (line 203), paste the value inside the string as the value for `vapidKey`.
1. Inside `public/index.html`, replace `<APP_ID>` with your app ID, which you can find in the **Settings** tab of the [TalkJS dashboard](https://talkjs.com/dashboard).
1. In the root directory of the project, run:
   ```sh
   firebase deploy --only hosting
   ```
   This will deploy the website at a URL like `https://<FIREBASE_APP_NAME>.web.app`.

## How to test the example

1. On the device where you want to receive push notifications, go to `https://<FIREBASE_APP_NAME>.web.app` and click the **Request token** button. Select to allow push notifications if prompted.
1. Switch to a different tab with another site (this is so that a notification will trigger when you get a new message).
1. Add a new message to the TalkJS `sample_conversation` conversation from the other user, `sample_user_alice`. A simple way to do this is to go to the **Chat UI** tab of the TalkJS dashboard](https://talkjs.com/dashboard) and add a message from the **Preview** chat UI.
1. You should now receive a push notification to your device with the message text.
