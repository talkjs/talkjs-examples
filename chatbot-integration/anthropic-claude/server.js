import express from "express";
import Anthropic from "@anthropic-ai/sdk";

const appId = "<APP_ID>";
const talkJSSecretKey = "<TALKJS_SECRET_KEY>";

const anthropicSecretKey = "<ANTHROPIC_SECRET_KEY>";

const anthropic = new Anthropic({
  apiKey: anthropicSecretKey,
});

const botId = "claudeExampleBot";
const allMessageHistory = {};

async function getReply(messageHistory) {
  const response = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    messages: messageHistory,
    max_tokens: 1024,
  });

  return response.content[0].text;
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
          sender: "claudeExampleBot",
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

    const reply = await getReply(messageHistory);
    await sendMessage(convId, reply);
  }
  console.log(allMessageHistory);

  res.status(200).end();
});

app.listen(3000, () => console.log("Server is up"));
