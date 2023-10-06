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

// Create a thread as a new conversation
async function createThread(parentMessageId, parentConvId, participants) {
  const conversationId = "replyto_" + parentMessageId;
  return fetch(`${basePath}/v1/${appId}/conversations/${conversationId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secretKey}`,
    },
    body: JSON.stringify({
      participants: participants,
      subject: "Replies",
      custom: {
        parentConvId: parentConvId,
        parentMessageId: parentMessageId,
      },
    }),
  });
}

async function duplicateParentMessageText(parentMessageId, messageText) {
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
          type: "SystemMessage",
        },
      ]),
    }
  );
}

async function updateReplyCount(messageId, conversationId, count) {
  return fetch(
    `${basePath}/v1/${appId}/conversations/${conversationId}/messages/${messageId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        custom: { replyCount: count.toString() },
      }),
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
  // Get details of the message we'll reply to
  const parentMessageId = req.body.messageId;
  const parentConvId = req.body.conversationId;
  const parentMessageText = req.body.messageText;
  const parentParticipants = req.body.participants;

  const response = await getMessages(parentMessageId);
  const messages = await response.json();

  // Create a message with the text of the parent message if one doesn't already exist
  if (!messages.data?.length) {
    await createThread(parentMessageId, parentConvId, parentParticipants);
    await duplicateParentMessageText(parentMessageId, parentMessageText);
  }

  res.status(200).end();
});

// Endpoint for message.sent webhook
app.post("/updateReplyCount", async (req, res) => {
  const data = req.body.data;
  const conversationId = data.conversation.id;
  const messageType = data.message.type;

  if (conversationId.startsWith("replyto_") && messageType === "UserMessage") {
    const { parentMessageId, parentConvId } = data.conversation.custom;

    const response = await getMessages(parentMessageId);
    const messages = await response.json();

    const messageCount = messages.data.length;

    // Ignore the first message in thread (it's a repeat of the parent message)
    if (messageCount > 1) {
      await updateReplyCount(parentMessageId, parentConvId, messageCount - 1);
    }
  }

  res.status(200).end();
});

// THIS IS SETUP CODE FOR THE EXAMPLE
// You won't need any of it in your live app!
//
// It's just here so that you can play around with this example more easily
// Whenever you run this script, we make sure the two example users are created
// recreate the two conversations, and send messages from the example users

async function setupConversation() {
  const conversationId = "threadsExample";

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

async function sendMessage(messageText) {
  const conversationId = "threadsExample";

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
    }),
  });

  const sender = fetch(`${basePath}/v1/${appId}/users/${senderId}`, {
    method: "PUT",
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

  const conv = setupConversation();
  await conv;

  const message = sendMessage("Hello this is a test message");
  await message;
}

setup();
