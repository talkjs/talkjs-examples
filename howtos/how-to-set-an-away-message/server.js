import express from "express";
import fetch from "node-fetch";

const appId = "<APP_ID>";
const secretKey = "<SECRET_KEY>";

const basePath = "https://api.talkjs.com";

const app = express().use(express.json()); // creates http server
app.listen(3000, () => console.log("Server is up"));

// Track when we auto-replied to each conversation ID so we don't send multiple replies in a row
const alreadyReplied = {};

function isOutOfHours(date) {
  // Sunday
  if (date.getDay() === 0) return true;

  // Saturday
  if (date.getDay() === 6) return true;

  // Before 9am
  if (date.getHours() < 9) return true;

  // After 5pm
  if (date.getHours() >= 17) return true;

  // Otherwise
  return false;
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
  const date = new Date(data.message.createdAt);

  if (
    isOutOfHours(date) &&
    role === "customer" &&
    !(conversationId in alreadyReplied)
  ) {
    await sendReply(conversationId);
    alreadyReplied[conversationId] = new Date();
  }

  if (role === "support") {
    delete alreadyReplied[conversationId];
  }

  res.status(200).end();
});
