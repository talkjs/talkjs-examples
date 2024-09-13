import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const appId = "<APP_ID>";
const secretKey = "<SECRET_KEY>";

const basePath = "https://api.talkjs.com";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(3001, () => console.log("Server is up"));

const axiosInstance = axios.create({
  baseURL: `${basePath}/v1/${appId}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${secretKey}`,
  },
});

// Get messages in a given thread (sub-conversation)
async function getMessages(messageId) {
  try {
    // Sometimes getOrCreateConversation gets called slightly out of sync with this backend,
    // which causes the thread functionality to break, so we make a "put" call
    // to create the conversation if it doesn't already exist
    await axiosInstance.put(`/conversations/replyto_${messageId}/`);
    const response = await axiosInstance.get(
      `/conversations/replyto_${messageId}/messages`
    );

    if (!response.data) {
      return { data: [] };
    } else {
      return response;
    }
  } catch (error) {
    throw error;
  }
}

// Create a thread as a new conversation
async function createThread(parentMessageId, parentConvId, participants) {
  try {
    const response = await axiosInstance.put(
      `/conversations/replyto_${parentMessageId}`,
      {
        participants: participants,
        subject: "Replies",
        custom: {
          parentConvId: parentConvId,
          parentMessageId: parentMessageId,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

// Send message to the new thread with text of parent message
async function duplicateParentMessageText(parentMessageId, messageText) {
  try {
    const response = await axiosInstance.post(
      `/conversations/replyto_${parentMessageId}/messages`,
      [
        {
          text: messageText,
          type: "SystemMessage",
        },
      ]
    );
    return response;
  } catch (error) {
    throw error;
  }
}

// Update parent message with a reply count custom field
async function updateReplyCount(messageId, conversationId, count) {
  const response = await axiosInstance.put(
    `/conversations/${conversationId}/messages/${messageId}`,
    {
      custom: { replyCount: count.toString() },
    }
  );
  return response;
}

async function handleThreadCreation(
  parentMessageId,
  parentConvId,
  participants,
  messageText
) {
  try {
    const createThreadResponse = await createThread(
      parentMessageId,
      parentConvId,
      participants
    );

    const duplicateMessageResponse = await duplicateParentMessageText(
      parentMessageId,
      messageText
    );

    return {
      thread: createThreadResponse.data,
      duplicateMessage: duplicateMessageResponse.data,
    };
  } catch (error) {
    throw error;
  }
}

// Endpoint for webhook listener for reply counts
app.post("/update-reply-count", async (req, res) => {
  try {
    const data = req.body.data;
    const conversationId = data.conversation.id;
    const messageType = data.message.type;

    if (
      conversationId.startsWith("replyto_") &&
      messageType === "UserMessage"
    ) {
      const { parentMessageId, parentConvId } = data.conversation.custom;

      const response = await getMessages(parentMessageId);
      const messages = await response.data;

      const messageCount = messages.data.length;

      // Ignore the first message in thread (it's a repeat of the parent message)
      if (messageCount > 1) {
        await updateReplyCount(parentMessageId, parentConvId, messageCount - 1);
      }
    }
  } catch (error) {
    res.status(500).send({
      error: "There was an error updating the reply count: ",
      details: error.message,
    });
  }
});

// Endpoint to create new sub-conversation (thread)
app.post("/new-thread", async (req, res) => {
  // Get details of the message we'll reply
  try {
    const parentMessageId = req.body.messageId;
    const parentConvId = req.body.conversationId;
    const parentMessageText = req.body.messageText;
    const parentParticipants = req.body.participants;

    const response = await getMessages(parentMessageId);
    const messages = await response.data;

    // Create a message with the text of the parent message if one doesn't already exist
    if (!messages.data?.length) {
      await handleThreadCreation(
        parentMessageId,
        parentConvId,
        parentParticipants,
        parentMessageText
      );
    }
  } catch (error) {
    res.status(400).send("There was an error creating a new thread: " + error);
  }
});

export const server = app;
