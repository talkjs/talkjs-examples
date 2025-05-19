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

async function sendMessage(conversationId, text) {
  return fetch(
    `https://api.talkjs.com/v1/${appId}/conversations/${conversationId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${talkJSSecretKey}`,
      },
      body: JSON.stringify([
        {
          text: text,
          sender: "chatbotExampleBot",
          type: "UserMessage",
        },
      ]),
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

  if (senderId == botId) {
    // Bot message
    messageHistory.push({ role: "assistant", content: messageText });
  } else {
    // User message
    messageHistory.push({ role: "user", content: messageText });
    getCompletion(messageHistory).then((reply) => sendMessage(convId, reply));
  }

  res.status(200).end();
});

app.listen(3000, () => console.log("Server is up"));
