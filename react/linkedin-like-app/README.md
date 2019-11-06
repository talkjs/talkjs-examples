# LinkedIn-like Messaging App with React and TalkJS

### Context
This directory contains an files for an application that emulates the messaging part of LinkedIn. It serves to show how Chat can be integrated into an application using TalkJS.

The app consists three parts:
<ul>
  <li>Login: This is the entry point of the app, where the basic data of the current user is collected</li>
  <li>My Network: This is similar to the "My Network" of LinkedIn. It displays a list of users. Each user has a "Message" button which you can use to start a conversation with the user. On click of the "Message button", a chatbox pops up to the right of the screen just like it is on LinkedIn</li>
  <li>Messaging: This is similar to the Messaging part of the LinkedIn app. All conversations a user has with other users appear here. </li>
</ul>

### Requirements
To get this app running on your system, ensure that you are working with Node >= version 6 and npm >= version 5.2.

### Getting Started
Here are the steps to get this app running on your system.
<ol>  
  <li>Clone or download this app</li>
  <li>Run `npm install`</li>
  <li>In the `Messaging.js` file, replace "MY_APP_ID" on line 30 with your APP ID gotten from your TalkJS dashboard at at https://talkjs.com/dashboard/login. Do the same thing in the `MyNetwork.js` file on line 25.</li>
  <li>Run `npm start`</li>
</ol>

### More Information
For more information on how to integrate TalkJS into your projects, check out our [documentation](https://talkjs.com/docs).


