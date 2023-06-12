import express from "express";
import fetch from "node-fetch";

const appId = "<APP_ID>";
const secretKey = "<SECRET_KEY>";

const basePath = "https://api.talkjs.com";
const path = basePath + "/v1/" + appId + "/conversations/";

const app = express().use(express.json()); // creates http server

app.listen(3000, () => console.log("Server is up"));

async function setAnswered(conversationId, isSupport) {
  return fetch(path + conversationId, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secretKey}`,
    },
    body: JSON.stringify({
      custom: {
        answered: isSupport ? "true" : "false",
      },
    }),
  });
}

app.post("/talkjs", async (req, res) => {
  const data = req.body.data;
  const role = data.sender.role;
  const conversationId = data.conversation.id;

  await setAnswered(conversationId, role === "support");
  res.status(200).end();
});
