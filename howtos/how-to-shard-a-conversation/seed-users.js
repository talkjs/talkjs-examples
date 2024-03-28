// THIS IS SETUP CODE FOR THE EXAMPLE
// You won't need any of it in your live app!
//
// It's just here so that you can play around with this example more easily
// When you run the script, we make sure three conversations with two users
// each are created, and send messages from the example users.

import fetch from "node-fetch";

const shard1Users = [
  "3716aff9-26a9-42b4-8e81-a0dbf046fa79",
  "e5a779da-4361-48df-8438-4f9a59a420ca",
];
const shard2Users = [
  "1fc4a7d4-a3dc-4b27-a106-81592a24f609",
  "d1e236c8-d912-4b9d-8cf6-bbbe0f3a36cf",
];
const shard3Users = [
  "57da4614-ac67-4ad0-a824-2f65772a9fae",
  "5a3fce5a-0fa5-4f44-8abd-31bb4af7bf86",
];

const appId = "<YOUR_APP_ID>";
const secretKey = "<SECRET_KEY>";

function request(method, path, data) {
  return fetch(`https://api.talkjs.com/v1/${appId}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secretKey}`,
    },
    body: JSON.stringify(data),
  }).then(async (res) => console.log(res.url, res.status, await res.text()));
}

async function setupConversation1() {
  const conversationId = `sharded-conversation-1`;

  //Create a conversation with two participants
  await request("PUT", `/conversations/${conversationId}`, {
    participants: shard1Users,
    subject: "GRG vs PRX: Playoffs (shard 1)",
  });

  //Send a message from one of the participants
  await request("POST", `/conversations/${conversationId}/messages`, [
    {
      text: "Who's excited about the game today?",
      sender: shard1Users[0],
      type: "UserMessage",
    },
  ]);
}

async function setupConversation2() {
  const conversationId = `sharded-conversation-2`;

  await request("PUT", `/conversations/${conversationId}`, {
    participants: shard2Users,
    subject: "GRG vs PRX: Playoffs (shard 2)",
  });

  await request("POST", `/conversations/${conversationId}/messages`, [
    {
      text: "Hello everyone!! Really excited to be watching this game!!",
      sender: shard2Users[0],
      type: "UserMessage",
    },
  ]);
}

async function setupConversation3() {
  const conversationId = `sharded-conversation-3`;

  await request("PUT", `/conversations/${conversationId}`, {
    participants: shard3Users,
    subject: "GRG vs PRX: Playoffs (shard 3)",
  });

  await request("POST", `/conversations/${conversationId}/messages`, [
    {
      text: "Let's go!! I believe PRX is going to go all the way today!",
      sender: shard3Users[0],
      type: "UserMessage",
    },
  ]);
}

async function setupUsers() {
  const user1 = request("PUT", `/users/${shard1Users[0]}`, {
    name: "Mikaela Ross",
    email: ["mikaela.ross@example.com"],
    photoUrl: "https://talkjs.com/images/avatar-1.jpg",
    role: "default",
  });
  const user2 = request("PUT", `/users/${shard1Users[1]}`, {
    name: "Kirsten Doe",
    email: ["kirsten.doe@example.com"],
    photoUrl: "https://talkjs.com/images/avatar-2.jpg",
    role: "default",
  });
  const user3 = request("PUT", `/users/${shard2Users[0]}`, {
    name: "Gemma River",
    email: ["gemma.river@example.com"],
    photoUrl: "https://talkjs.com/images/avatar-3.jpg",
    role: "default",
  });

  const user4 = request("PUT", `/users/${shard2Users[1]}`, {
    name: "Thomas George",
    email: ["thomas.george@example.com"],
    photoUrl: "https://talkjs.com/images/avatar-4.jpg",
    role: "default",
  });

  const user5 = request("PUT", `/users/${shard3Users[0]}`, {
    name: "James Fayland",
    email: ["james.fayland@example.com"],
    photoUrl: "https://talkjs.com/images/avatar-5.jpg",
    role: "default",
  });

  const user6 = request("PUT", `/users/${shard3Users[1]}`, {
    name: "Janette Joseph",
    email: ["janette.joseph@example.com"],
    photoUrl: "https://talkjs.com/images/avatar-6.jpg",
    role: "default",
  });

  await Promise.all([user1, user2, user3, user4, user5, user6]);
}

async function setupConversations() {
  await Promise.all([
    setupConversation1(),
    setupConversation2(),
    setupConversation3(),
  ]);
}

setupUsers().then(() => {
  setupConversations();
});
