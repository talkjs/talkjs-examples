// THIS SCRIPT IS SETUP CODE FOR THE EXAMPLE
// You won't need any of it in your live app!
//
// It's just here so that you can play around with this example more easily
// Whenever you run this script, we make sure the two example users are created
// recreate the two conversations, and send messages from the example users

import fetch from "node-fetch";

const appId = "<APP_ID>";
const secretKey = "<SECRET_KEY>";

const basePath = "https://api.talkjs.com";

const senderId = `messageCenterExampleSender`;
const receiverId = `messageCenterExampleReceiver`;

async function setupConversation(i, conversationSubject) {
  const conversationId = `messageCenterExample${i}`;

  // Delete the conversation (if it exists)
  await fetch(`${basePath}/v1/${appId}/conversations/${conversationId}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${secretKey}`,
    },
  });

  // Create a new conversation
  await fetch(`${basePath}/v1/${appId}/conversations/${conversationId}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secretKey}`,
    },
    body: JSON.stringify({
      participants: [receiverId, senderId],
      subject: conversationSubject,
    }),
  });

  // Set conversation to read-only for receiver
  await fetch(
    `${basePath}/v1/${appId}/conversations/${conversationId}/participants/${receiverId}`,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        access: "Write",
      }),
    }
  );
}

async function sendMessage(i, messageText) {
  const conversationId = `messageCenterExample${i}`;

  // Send a message from the user to make sure it will show up in the conversation list
  await fetch(
    `${basePath}/v1/${appId}/conversations/${conversationId}/messages`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify([
        {
          text: messageText,
          sender: senderId,
          type: "UserMessage",
        },
      ]),
    }
  );
}

async function setup() {
  const receiver = fetch(`${basePath}/v1/${appId}/users/${receiverId}`, {
    method: "put",
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
  });

  const sender = fetch(`${basePath}/v1/${appId}/users/${senderId}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secretKey}`,
    },
    body: JSON.stringify({
      name: "TalkJS",
      email: ["example@example.com"],
      photoUrl: "https://talkjs.com/images/logo.jpg",
      welcomeMessage: "Hi!",
    }),
  });
  await receiver;
  await sender;

  const conv1 = setupConversation(1, "Welcome to TalkJS 👋");
  const conv2 = setupConversation(2, "We have a new feature ✨");

  await conv1;
  await conv2;

  const message1 = sendMessage(
    1,
    "Check out our <https://talkjs.com/docs/Getting_Started/|Getting Started guide>!"
  );
  const message2 = sendMessage(
    2,
    "See our <https://changelog.talkjs.com/|changelog> for more details!"
  );

  await message1;
  await message2;
}

setup();
