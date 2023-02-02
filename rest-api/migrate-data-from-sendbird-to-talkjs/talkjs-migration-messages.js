"use strict";
const fs = require("fs");
const axios = require("axios");

const instance = axios.create({
  baseURL: "https://api.talkjs.com",
  headers: {
    Authorization: "Bearer YOUR_SECRET_KEY",
    "Content-Type": "application/json",
  },
});

function importMessages(conversationJsonArray) {
  for (let conversation of conversationJsonArray) {
    instance.post(`/v1/YOUR_APP_ID/import/conversations/${Object.keys(conversation)[0]}/messages`, [...conversation[Object.keys(conversation)[0]]])
  }
}

const messagesRaw = fs.readFileSync("exported-data/messages.json");
const messagesJson = JSON.parse(messagesRaw);
const messages = messagesJson.messages;

const uniqueConversations = [
  ...new Set(messages.map((item) => item.channel_url)),
];

let conversationJsonArray = [];

for (let conversation of uniqueConversations) {
  let conversationJsonObj = {};
  conversationJsonObj[conversation] = [];
  conversationJsonArray.push(conversationJsonObj);
}

for(let conversation of conversationJsonArray) {
  for(let message of messages){
    if(Object.keys(conversation)[0] === message.channel_url){
      let messageObj = {};
      messageObj.text = message.message,
      messageObj.sender = message.user.user_id,
      messageObj.type = message.type === "MESG" ? "UserMessage" : "SystemMessage",
      messageObj.timestamp = message.created_at,
      messageObj.readBy = []
      conversation[message.channel_url].push(messageObj);
    }
  }
}

importMessages(conversationJsonArray);

