// THIS IS SETUP CODE FOR THE EXAMPLE
// You won't need any of it in your live app!
//
// It's just here so that you can play around with this example more easily
// When you run the script, we make sure the two example users are created,
// recreate the two conversations, and send messages from the example users

import fetch from "node-fetch";

const appId = "<APP_ID>";
const secretKey = "<SECRET_KEY>";

const basePath = "https://api.talkjs.com";

async function setupConversation() {
  const conversationId = `tabConversationExample1`;
  const userIdOne = `tabConversationExampleUser1`;
  const userIdTwo = `tabConversationExampleUser2`;
  const userIdThree = `tabConversationExampleUser3`;
  
  // delete the conversation (if it exists)
  await fetch(`${basePath}/v1/${appId}/conversations/${conversationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${secretKey}`,
    },
  });

  // Create a new conversation
  await fetch(`${basePath}/v1/${appId}/conversations/${conversationId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secretKey}`,
    },
    body: JSON.stringify({
      participants: ["tabConversationExampleSupportAgent", userIdOne, userIdTwo, userIdThree],
    }),
  });

  // Send a message from each user to make sure it will show up in the conversation list
  await fetch(
    `${basePath}/v1/${appId}/conversations/${conversationId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify([
        {
          text: "Can I get some help please?",
          sender: userIdOne,
          type: "UserMessage",
        },
      ]),
    }
  );

  await fetch(
    `${basePath}/v1/${appId}/conversations/${conversationId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify([
        {
          text: "Hi, how are you?",
          sender: userIdTwo,
          type: "UserMessage",
        },
      ]),
    }
  );

  await fetch(
    `${basePath}/v1/${appId}/conversations/${conversationId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify([
        {
          text: "I have a question!",
          sender: userIdThree,
          type: "UserMessage",
        },
      ]),
    }
  );
}

async function setup() {
  const supportAgent = fetch(
    `${basePath}/v1/${appId}/users/tabConversationExampleSupportAgent`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        name: "Alice",
        email: ["alice@example.com"],
        role: "default",
        photoUrl: "https://talkjs.com/images/avatar-1.jpg",
        welcomeMessage: "Hey there! How can I help?",
      }),
    }
  );

  const user1 = fetch(
    `${basePath}/v1/${appId}/users/tabConversationExampleUser1`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        name: "Sebastian",
        email: ["sebastian@example.com"],
        role: "default",
        photoUrl: "https://talkjs.com/images/avatar-5.jpg",
        welcomeMessage: "Hi!",
      }),
    }
  );

  const user2 = fetch(
    `${basePath}/v1/${appId}/users/tabConversationExampleUser2`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        name: "Bob",
        email: ["bob@example.com"],
        role: "default",
        photoUrl: "https://talkjs.com/images/avatar-4.jpg",
        welcomeMessage: "Hello!",
      }),
    }
  );

  const user3 = fetch(
    `${basePath}/v1/${appId}/users/tabConversationExampleUser3`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        name: "Jane",
        email: ["jane@example.com"],
        role: "default",
        photoUrl: "https://talkjs.com/images/avatar-3.jpg",
        welcomeMessage: "Hello!",
      }),
    }
  );

  await Promise.all([supportAgent, user1, user2, user3]);

  const conv1 = setupConversation();

  await conv1;
}

setup();
