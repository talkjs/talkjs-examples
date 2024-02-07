import express from "express";
import fetch from "node-fetch";
import cors from "cors";

// Replace with your app ID and secret key
const appId = "<APP_ID>";
const secretKey = "<SECRET_KEY>";

const basePath = "https://api.talkjs.com";

const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.listen(3000, () => console.log("Server is up"));

// EVERYTHING BELOW IS SETUP CODE FOR THIS EXAMPLE
// You won't need any of it in your live app!
//
// It's just here so that you can play around with this example more easily
// Whenever you start the server, we make sure the two example users are created
// recreate the two conversations, and send messages from the example users

async function setupConversation(i) {
  const conversationId = `conversationExample${i}`;
  const userId = `conversationExampleUser${i}`;

  // Delete the conversation (if it exists)
  await fetch(`${basePath}/v1/${appId}/conversations/${conversationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${secretKey}`,
    },
  });

  // Create a new conversation
  await fetch(`${basePath}/v1/${appId}/conversations/${conversationId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secretKey}`,
    },
    body: JSON.stringify({
      participants: ["conversationExampleSupportAgent", userId],
    }),
  });

  // Send a message from the user to make sure it will show up in the conversation list
  await fetch(
    `${basePath}/v1/${appId}/conversations/${conversationId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify([
        {
          text: "Everything is broken again!",
          sender: userId,
          type: "UserMessage",
        },
      ]),
    }
  );

  // Send a System Message asking the users to vote in the poll.
  await fetch(
    `${basePath}/v1/${appId}/conversations/${conversationId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify([
        {
          text: "Would you use TalkJS instead of developing your own chat solution?\n" +
          "<actionbutton:yesOrNo?choice=yes|Yes><actionbutton:yesOrNo?choice=no|No>" +
          "<actionbutton:yesOrNo?choice=end|End Poll>",
          type: "SystemMessage",
        },
      ]),
    }
  );
}

async function setup() {
  const supportAgent = fetch(
    `${basePath}/v1/${appId}/users/conversationExampleSupportAgent`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        name: "Alice",
        email: ["alice@example.com"],
        role: "default",
        photoUrl: "https://talkjs.com/images/avatar-1.jpg",
        welcomeMessage: "Hey there! How can I help?",
      }),
    }
  );

  const user1 = fetch(
    `${basePath}/v1/${appId}/users/conversationExampleUser1`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        name: "Sebastian",
        email: ["sebastian@example.com"],
        photoUrl: "https://talkjs.com/images/avatar-5.jpg",
        welcomeMessage: "Hi!",
      }),
    }
  );
  
  const user2 = fetch(
    `${basePath}/v1/${appId}/users/conversationExampleUser2`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        name: "Bob",
        email: ["bob@example.com"],
        photoUrl: "https://talkjs.com/images/avatar-4.jpg",
        welcomeMessage: "Hello!",
      }),
    }
  );

  await supportAgent;
  await user1;
  await user2;
  
  const conv1 = setupConversation(1);
  const conv2 = setupConversation(2);

  await conv1;
  await conv2;
}

setup();
