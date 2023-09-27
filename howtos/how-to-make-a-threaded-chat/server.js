import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const appId = "<APP_ID>";
const secretKey = "<SECRET_KEY>";

const basePath = "https://api.talkjs.com";

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, () => console.log("Server is up"));

const senderId = `threadsExampleSender`;
const receiverId = `threadsExampleReceiver`;

async function newThread(parentMessageId, parentConvId) {
  const conversationId = "replyto_" + parentMessageId;

  return fetch(`${basePath}/v1/${appId}/conversations/${conversationId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secretKey}`,
    },
    body: JSON.stringify({
      participants: [receiverId, senderId],
      subject: "Replies",
      custom: {
        parentConvId: parentConvId,
      },
    }),
  });
}

async function newMessage(parentMessageId, messageText) {
  const conversationId = "replyto_" + parentMessageId;
  return fetch(
    `${basePath}/v1/${appId}/conversations/${conversationId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify([
        {
          text: messageText,
          sender: senderId,
          type: "SystemMessage",
        },
      ]),
    }
  );
}

function getMessages(messageId) {
  const conversationId = "replyto_" + messageId;

  return fetch(
    `${basePath}/v1/${appId}/conversations/${conversationId}/messages`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
    }
  );
}

app.post("/newThread", async (req, res) => {
  const messageId = req.body["messageId"];
  const conversationId = req.body["conversationId"];
  const messageText = req.body["messageText"];

  await newThread(messageId, conversationId);

  let response = await getMessages(messageId);
  let messages = await response.json();

  // Create a new thread if one doesn't already exist
  if (messages.data === undefined || messages.data.length == 0) {
    await newMessage(messageId, messageText);
  }

  res.status(200).end();
});

// THIS IS SETUP CODE FOR THE EXAMPLE
// You won't need any of it in your live app!
//
// It's just here so that you can play around with this example more easily
// Whenever you run this script, we make sure the two example users are created
// recreate the two conversations, and send messages from the example users

async function setupConversation(i) {
  const conversationId = `threadsExample${i}`;

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
    }),
  });
}

async function sendMessage(i, messageText) {
  const conversationId = `threadsExample${i}`;

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
    }),
  });

  const sender = fetch(`${basePath}/v1/${appId}/users/${senderId}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secretKey}`,
    },
    body: JSON.stringify({
      name: "Bob",
      email: ["bob@example.com"],
      role: "default",
      photoUrl: "https://talkjs.com/images/avatar-2.jpg",
    }),
  });
  await receiver;
  await sender;

  const conv1 = setupConversation(1);
  await conv1;

  const message1 = sendMessage(1, "Hello this is a test message");
  await message1;
}

setup();