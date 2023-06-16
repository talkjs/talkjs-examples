import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const appId = "<APP_ID>";
const secretKey = "<SECRET_KEY>";

const basePath = "https://api.talkjs.com";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => console.log("Server is up"));

async function deleteConversation(conversationId) {
  console.log("Deleting conversation with id:", conversationId);
  return fetch(`${basePath}/v1/${appId}/conversations/${conversationId}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secretKey}`,
    },
  });
}

app.post("/conversationAction", async (req, res) => {
  const conversationId = req.body["conversationId"];
  await deleteConversation(conversationId);
  res.status(200).end();
});

// EVERYTHING BELOW IS SETUP CODE FOR THIS EXAMPLE
// You won't need any of it in your live app!
//
// It's just here so that you can play around with this example more easily
// Whenever you start the server, we make sure the two example users are created
// recreate the two conversations, and send messages from the example users

async function setupConversation(i) {
  const conversationId = `deleteConversationExample${i}`;
  const userId = `deleteConversationExampleUser${i}`;

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
      participants: ["deleteConversationExampleSupportAgent", userId],
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
    `${basePath}/v1/${appId}/users/deleteConversationExampleSupportAgent`,
    {
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
    }
  );

  const user1 = fetch(
    `${basePath}/v1/${appId}/users/deleteConversationExampleUser1`,
    {
      method: "put",
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
    `${basePath}/v1/${appId}/users/deleteConversationExampleUser2`,
    {
      method: "put",
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
