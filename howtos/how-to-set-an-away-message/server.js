import express from "express";
import fetch from "node-fetch";

const appId = "<APP_ID>";
const secretKey = "<SECRET_KEY>";

const basePath = "https://api.talkjs.com";

const app = express().use(express.json()); // creates http server
app.listen(3000, () => console.log("Server is up"));

// Track when we auto-replied to each conversation ID so we don't send multiple replies in a row
const alreadyReplied = {};

// Start and end of support hours in "HH:mm:ss" format
const startTime = "09:00:00";
const endTime = "17:00:00";

function isTimeBetween(start, end, check) {
  if (start <= end) {
    return check >= start && check <= end;
  } else {
    // window overlaps midnight
    return (
      (check >= start && check <= "23:59:59") ||
      (check >= "00:00:00" && check <= end)
    );
  }
}

// Convert timestamp to "HH:mm:ss" format
function timeStampToTime(timestamp) {
  const checkDate = new Date(timestamp);
  const hours = "0" + checkDate.getHours();
  const minutes = "0" + checkDate.getMinutes();
  const seconds = "0" + checkDate.getSeconds();
  return hours.slice(-2) + ":" + minutes.slice(-2) + ":" + seconds.slice(-2);
}

async function sendReply(conversationId) {
  console.log("Autoreply to conversation ID:", conversationId);

  return fetch(
    `${basePath}/v1/${appId}/conversations/${conversationId}/messages`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify([
        {
          text: "We're currently out of the office and will get back to you during our support hours.",
          type: "SystemMessage",
        },
      ]),
    }
  );
}

app.post("/talkjs", async (req, res) => {
  const data = req.body.data;
  const conversationId = data.conversation.id;

  const role = data.sender?.role;
  const timestamp = data.message.createdAt;

  const outOfOffice = !isTimeBetween(
    startTime,
    endTime,
    timeStampToTime(timestamp)
  );

  if (outOfOffice && role === "customer") {
    if (!(conversationId in alreadyReplied)) {
      await sendReply(conversationId);
    }
    alreadyReplied[conversationId] = new Date();
  }

  if (role === "support") {
    delete alreadyReplied[conversationId];
  }

  res.status(200).end();
});

// EVERYTHING BELOW IS SETUP CODE FOR THIS EXAMPLE
// You won't need any of it in your live app!
//
// It's just here so that you can play around with this example more easily
// Whenever you start the server, we make sure the two example users are created
// recreate the two conversations, and send messages from the example users

async function setupConversation(i) {
  const conversationId = `autoReplyExample${i}`;
  const userId = `autoReplyExampleUser${i}`;

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
      participants: ["autoReplyExampleSupportAgent", userId],
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
    `${basePath}/v1/${appId}/users/autoReplyExampleSupportAgent`,
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

  const user1 = fetch(`${basePath}/v1/${appId}/users/autoReplyExampleUser1`, {
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

  const user2 = fetch(`${basePath}/v1/${appId}/users/autoReplyExampleUser2`, {
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
