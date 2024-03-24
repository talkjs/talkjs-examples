// THIS IS SETUP CODE FOR THE EXAMPLE
// You won't need any of it in your live app!
//
// It's just here so that you can play around with this example more easily
// When you run the script, we make sure three conversations with two users
// each are created, and send messages from the example users.

import fetch from "node-fetch";

const appId = "<YOUR_APP_ID>";
const secretKey = "<SECRET_KEY>";

const basePath = "https://api.talkjs.com";

async function setupConversation1() {
    const conversationId = `sharded-conversation-1`;

    //Create a conversation with two participants
    await fetch(`${basePath}/v1/${appId}/conversations/${conversationId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${secretKey}`,
        },
        body: JSON.stringify({
            participants: ["shardedUserOne", "shardedUserFour"],
            subject: "GRG vs PRX: Playoffs"
        })
    });

    //Send a message from one of the participants
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
                    text: "Who's excited about the game today?",
                    sender: "shardedUserOne",
                    type: "UserMessage",
                },
            ]),
        }
    );
}

async function setupConversation2() {
    const conversationId = `sharded-conversation-2`;

    await fetch(`${basePath}/v1/${appId}/conversations/${conversationId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${secretKey}`,
        },
        body: JSON.stringify({
            participants: ["shardedUserTwo", "shardedUserFive"],
            subject: "GRG vs PRX: Playoffs"
        })
    });

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
                    text: "Hello everyone!! Really excited to be watching this game!!",
                    sender: "shardedUserTwo",
                    type: "UserMessage",
                },
            ]),
        }
    );
}

async function setupConversation3() {
    const conversationId = `sharded-conversation-3`;

    await fetch(`${basePath}/v1/${appId}/conversations/${conversationId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${secretKey}`,
        },
        body: JSON.stringify({
            participants: ["shardedUserThree", "shardedUserSix"],
            subject: "GRG vs PRX: Playoffs"
        })
    });

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
                    text: "Let's go!! I believe PRX is going to go all the way today!",
                    sender: "shardedUserThree",
                    type: "UserMessage",
                },
            ]),
        }
    );
}

async function setupUsers() {
    const user1 = fetch(
        `${basePath}/v1/${appId}/users/shardedUserOne`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${secretKey}`,
            },
            body: JSON.stringify({
                name: "Mikaela Ross",
                email: ["mikaela.ross@example.com"],
                photoUrl: "https://talkjs.com/images/avatar-1.jpg",
                role: "default"
            }),
        }
    );
    const user2 = fetch(
        `${basePath}/v1/${appId}/users/shardedUserTwo`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${secretKey}`,
            },
            body: JSON.stringify({
                name: "Kirsten Doe",
                email: ["kirsten.doe@example.com"],
                photoUrl: "https://talkjs.com/images/avatar-2.jpg",
                role: "default"
            }),
        }
    );
    const user3 = fetch(
        `${basePath}/v1/${appId}/users/shardedUserThree`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${secretKey}`,
            },
            body: JSON.stringify({
                name: "Gemma River",
                email: ["gemma.river@example.com"],
                photoUrl: "https://talkjs.com/images/avatar-3.jpg",
                role: "default"
            }),
        }
    );

    const user4 = fetch(
        `${basePath}/v1/${appId}/users/shardedUserFour`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${secretKey}`,
            },
            body: JSON.stringify({
                name: "Thomas George",
                email: ["thomas.george@example.com"],
                photoUrl: "https://talkjs.com/images/avatar-4.jpg",
                role: "default"
            }),
        }
    );

    const user5 = fetch(
        `${basePath}/v1/${appId}/users/shardedUserFive`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${secretKey}`,
            },
            body: JSON.stringify({
                name: "James Fayland",
                email: ["james.fayland@example.com"],
                photoUrl: "https://talkjs.com/images/avatar-5.jpg",
                role: "default"
            }),
        }
    );

    const user6 = fetch(
        `${basePath}/v1/${appId}/users/shardedUserSix`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${secretKey}`,
            },
            body: JSON.stringify({
                name: "Janette Joseph",
                email: ["janette.joseph@example.com"],
                photoUrl: "https://talkjs.com/images/avatar-6.jpg",
                role: "default"
            }),
        }
    );

    await setupConversation1();
    await setupConversation2();
    await setupConversation3();
}

setupUsers();
