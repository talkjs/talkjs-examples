import express from "express";
import fetch from "node-fetch";
import OpenAI from "openai";

const appId = "<APP_ID>";
const talkJSSecretKey = "<TALKJS_SECRET_KEY>";

const openAISecretKey = "<OPENAI_SECRET_KEY>";
const openai = new OpenAI({ apiKey: openAISecretKey });

const botId = "chatbotExampleBot";
const allMessageHistory = {};

async function getCompletion(messageHistory) {
  const completion = await openai.chat.completions.create({
    messages: messageHistory,
    model: "gpt-4o-mini",
  });
  const reply = completion.choices[0].message.content;
  return reply;
}

async function sendInitialMessage(conversationId) {
  const response = await fetch(
    `https://api.talkjs.com/v1/${appId}/conversations/${conversationId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${talkJSSecretKey}`,
      },
      body: JSON.stringify([
        {
          text: "_Let me think for a bit..._", // Placeholder text that the theme will replace with a typing indicator
          sender: "chatbotExampleBot",
          type: "UserMessage",
          custom: { isTyping: "true" },
        },
      ]),
    }
  );

  // Return the message ID for later editing
  const data = await response.json();
  return data[0].id;
}

async function updateBotMessage(conversationId, messageId, text) {
  return fetch(
    `https://api.talkjs.com/v1/${appId}/conversations/${conversationId}/messages/${messageId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${talkJSSecretKey}`,
      },
      body: JSON.stringify({
        text: text,
        custom: { isTyping: "false" },
      }),
    }
  );
}

async function setUserAccess(conversationId, userId, access) {
  return fetch(
    `https://api.talkjs.com/v1/${appId}/conversations/${conversationId}/participants/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${talkJSSecretKey}`,
      },
      body: JSON.stringify({ access: access }),
    }
  );
}

const app = express();
app.use(express.json());

app.post("/onMessageSent", async (req, res) => {
  const convId = req.body.data.conversation.id;
  const messageText = req.body.data.message.text;
  const senderId = req.body.data.sender.id;

  if (!(convId in allMessageHistory)) {
    allMessageHistory[convId] = [
      {
        role: "system",
        content:
          "You are a helpful assistant. Please provide short, concise answers.",
      },
    ];
  }

  const messageHistory = allMessageHistory[convId];

  if (senderId != botId) {
    messageHistory.push({ role: "user", content: messageText });
    const messageId = await sendInitialMessage(convId);
    await setUserAccess(convId, senderId, "Read");
    const reply = await getCompletion(messageHistory);
    await updateBotMessage(convId, messageId, reply);
    messageHistory.push({ role: "assistant", content: reply });
    await setUserAccess(convId, senderId, "ReadWrite");
  }

  res.status(200).end();
});

