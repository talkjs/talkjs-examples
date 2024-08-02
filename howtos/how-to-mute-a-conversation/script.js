import fetch from "node-fetch";

const appId = "<APP_ID>";
const secretKey = "<SECRET_KEY>";

const basePath = "https://api.talkjs.com";
const conversationId = "muteConversationExample";

// Add a new message from Sebastian

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
        text: "There's a problem with my order",
        sender: "muteConversationExampleUser",
        type: "UserMessage",
      },
    ]),
  }
);
