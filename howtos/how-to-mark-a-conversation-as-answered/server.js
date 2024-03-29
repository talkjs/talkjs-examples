import express from "express";
import fetch from "node-fetch";

const appId = "<APP_ID>";
const secretKey = "<SECRET_KEY>";

const basePath = "https://api.talkjs.com";

const app = express().use(express.json()); // creates http server

app.listen(3000, () => console.log("Server is up"));

async function setAnswered(conversationId, isSupport) {
  console.log("Setting answered on", conversationId, "to", isSupport);
  return fetch(`${basePath}/v1/${appId}/conversations/${conversationId}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secretKey}`,
    },
    body: JSON.stringify({
      custom: {
        answered: isSupport ? "true" : "false",
      },
    }),
  });
}

app.post("/talkjs", async (req, res) => {
  const data = req.body.data;
  const role = data.sender.role;
  const conversationId = data.conversation.id;

  await setAnswered(conversationId, role === "support");
  res.status(200).end();
});

// EVERYTHING BELOW IS SETUP CODE FOR THIS EXAMPLE
// You won't need any of it in your live app!
//
// It's just here so that you can play around with this example more easily
// Whenever you start the server, we make sure the two example users are created
// recreate the two conversations, and send messages from the example users

async function setupConversation(i) {
  const conversationId = `webhooksExample${i}`;
  const userId = `webhooksExampleUser${i}`;

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
      participants: ["webhooksExampleSupportAgent", userId],
    }),
  });

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
    `${basePath}/v1/${appId}/users/webhooksExampleSupportAgent`,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        name: "Alice",
        email: ["alice@example.com"],
        photoUrl: "https://talkjs.com/images/avatar-1.jpg",
        role: "support",
        welcomeMessage: "Hey there! How can I help?",
      }),
    }
  );

  const user1 = fetch(`${basePath}/v1/${appId}/users/webhooksExampleUser1`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secretKey}`,
    },
    body: JSON.stringify({
      name: "Sebastian",
      email: ["Sebastian@example.com"],
      photoUrl: "https://talkjs.com/images/avatar-5.jpg",
      role: "customer",
      welcomeMessage: "Hi!",
    }),
  });

  const user2 = fetch(`${basePath}/v1/${appId}/users/webhooksExampleUser2`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secretKey}`,
    },
    body: JSON.stringify({
      name: "Bob",
      email: ["Bob@example.com"],
      photoUrl: "https://talkjs.com/images/avatar-4.jpg",
      role: "customer",
      welcomeMessage: "Hello!",
    }),
  });

  await supportAgent;
  await user1;
  await user2;

  const conv1 = setupConversation(1);
  const conv2 = setupConversation(2);

  await conv1;
  await conv2;
}

setup();
