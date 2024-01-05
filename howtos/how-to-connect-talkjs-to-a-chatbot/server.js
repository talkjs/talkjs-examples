import express from "express";
import fetch from "node-fetch";
import OpenAI from "openai";

const appId = "<APP_ID>";
const talkJSSecretKey = "<TALKJS_SECRET_KEY>";
const basePath = "https://api.talkjs.com";
const conversationId = "chatbotExampleConversation";

const openAISecretKey = "<OPENAI_SECRET_KEY>";
const openai = new OpenAI({ apiKey: openAISecretKey });

const botId = "chatbotExampleBot";
const userId = "chatbotExampleUser";

const messageHistory = [
  { role: "system", content: "You are a helpful assistant." },
];

async function getCompletion(prompt) {
  const completion = await openai.chat.completions.create({
    messages: messageHistory,
    model: "gpt-3.5-turbo",
  });

  const reply = completion.choices[0].message.content;

  return reply;
}

async function sendMessage(text) {
  return fetch(
    `${basePath}/v1/${appId}/conversations/${conversationId}/messages`,
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

app.listen(3000, () => console.log("Server is up"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/getMessages", async (req, res) => {
  const userMessage = req.body.data.message.text;
  const senderId = req.body.data.message.senderId;

  if (senderId == userId) {
    messageHistory.push({ role: "user", content: userMessage });

    const reply = await getCompletion(userMessage);

    await sendMessage(reply);
  } else if (senderId == botId) {
    messageHistory.push({ role: "assistant", content: userMessage });
  }
  res.status(200).end();
});
