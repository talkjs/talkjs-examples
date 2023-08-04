// THIS IS SETUP CODE FOR THE EXAMPLE
// You won't need any of it in your live app!
//
// It's just here so that you can play around with this example more easily
// When you run the script, we make sure the two example users are created,
// recreate the two conversations, and send messages from the example users

import fetch from "node-fetch";

const appId = "<APP_ID>";
const secretKey = "<SECRET_KEY>";

const basePath = "https://api.talkjs.com";

async function setupConversation(i) {
  const conversationId = `archiveConversationExample${i}`;
  const userId = `archiveConversationExampleUser${i}`;

  // archive the conversation (if it exists)
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
      participants: ["archiveConversationExampleSupportAgent", userId],
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
}

async function setup() {
  const supportAgent = fetch(
    `${basePath}/v1/${appId}/users/archiveConversationExampleSupportAgent`,
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
    `${basePath}/v1/${appId}/users/archiveConversationExampleUser1`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        name: "Sebastian",
        email: ["sebastian@example.com"],
        role: "default",
        photoUrl: "https://talkjs.com/images/avatar-5.jpg",
        welcomeMessage: "Hi!",
      }),
    }
  );

  const user2 = fetch(
    `${basePath}/v1/${appId}/users/archiveConversationExampleUser2`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        name: "Bob",
        email: ["bob@example.com"],
        role: "default",
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
