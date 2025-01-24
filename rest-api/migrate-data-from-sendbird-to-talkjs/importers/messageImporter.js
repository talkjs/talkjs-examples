const fs = require("fs").promises;
const axios = require("axios");
const { secretKey, appID } = require("../config.js");

const instance = axios.create({
  baseURL: "https://api.talkjs.com",
  headers: {
    Authorization: `Bearer ${secretKey}`,
    "Content-Type": "application/json",
  },
});

// Batch size of messages to import in one go
// The TalkJS import endpoint has a limit of 10 messages per request
const batchSize = 10;

async function processMessages(messages) {
  const uniqueConversations = [
    ...new Set(messages.map((item) => item.channel_url)),
  ];
  console.log(`Found ${uniqueConversations.length} unique conversations`);

  let conversationJsonArray = [];
  let skippedCount = 0;

  // Initialize conversation objects
  for (let conversation of uniqueConversations) {
    let conversationJsonObj = {};
    conversationJsonObj[conversation] = [];
    conversationJsonArray.push(conversationJsonObj);
  }

  // Group messages by conversation
  for (let conversation of conversationJsonArray) {
    for (let message of messages) {
      // Skip messages with removed flag
      if (message.is_removed === true) {
        console.log(`Skipping removed message: ${message.message_id}`);
        skippedCount++;
        continue;
      }
      // Skip messages with a non-MESG Sendbird message type
      if (message.type !== "MESG") {
        console.log(`Skipping non-MESG type message: ${message.message_id}`);
        skippedCount++;
        continue;
      }

      if (Object.keys(conversation)[0] === message.channel_url) {
        let messageObj = {
          text: message.message,
          sender: message.user.user_id,
          type: "UserMessage",
          timestamp: message.created_at,
          readBy: [],
        };
        conversation[message.channel_url].push(messageObj);
      }
    }
  }

  console.log(`Skipped ${skippedCount} messages`);
  return conversationJsonArray;
}

async function importBatch(conversationId, messages) {
  await instance.post(
    `/v1/${appID}/import/conversations/${conversationId}/messages`,
    messages
  );
  console.log(
    `Imported batch of ${messages.length} messages for conversation: ${conversationId}`
  );
}

async function importMessages(filePath) {
  try {
    // Read and parse file
    const data = await fs.readFile(filePath, "utf8");
    console.log(`Read file: ${filePath}`);

    const messagesJson = JSON.parse(data);
    console.log(
      `Parsed JSON data with ${messagesJson.messages?.length || 0} messages`
    );

    if (!Array.isArray(messagesJson.messages)) {
      throw new Error("Invalid data structure: messages is not an array");
    }

    const conversationJsonArray = await processMessages(messagesJson.messages);

    // Import messages for each conversation in batches
    for (let conversation of conversationJsonArray) {
      const conversationId = Object.keys(conversation)[0];
      const messages = conversation[conversationId];

      console.log(
        `Processing ${messages.length} messages for conversation: ${conversationId}`
      );

      // Split messages into batches
      for (let i = 0; i < messages.length; i += batchSize) {
        const batch = messages.slice(i, i + batchSize);
        try {
          await importBatch(conversationId, batch);
        } catch (err) {
          console.error(
            `Failed to import batch for conversation ${conversationId}:`,
            err.response?.data || err.message
          );
        }
      }
    }
  } catch (err) {
    console.error(`Failed to process message file ${filePath}:`, err.message);
    throw err;
  }
}

module.exports = { importMessages };
