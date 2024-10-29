import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const appId = "<APP_ID>";
const talkJSSecretKey = "<TALKJS_SECRET_KEY>";
const geminiApiKey = "<GEMINI_API_KEY>";

const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const botId = "geminiExampleBot";
const allMessageHistory = {};

async function getReply(messageHistory) {
  // Convert the message history format to Gemini's format
  const chat = model.startChat({
    history: messageHistory,
    generationConfig: {
      maxOutputTokens: 1024,
    },
  });

  const result = await chat.sendMessage(
    messageHistory[messageHistory.length - 1].content
  );
  const response = await result.response;
  return response.text();
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
          sender: "geminiExampleBot",
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
        role: "user",
        parts:
          "You are a helpful assistant. Please provide short, concise answers.",
      },
    ];
  }
  const messageHistory = allMessageHistory[convId];

  if (senderId == botId) {
    // Bot message
    messageHistory.push({ role: "model", parts: messageText });
  } else {
    // User message
    messageHistory.push({ role: "user", parts: messageText });

    try {
      const reply = await getReply(messageHistory);
      await sendMessage(convId, reply);
    } catch (error) {
      console.error("Error getting reply from Gemini:", error);
      await sendMessage(
        convId,
        "I apologize, but I encountered an error processing your message."
      );
    }
  }

  res.status(200).end();
});

app.listen(3000, () => console.log("Server is up"));
