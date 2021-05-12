import fetch from "node-fetch";
import * as fs from 'fs';
const host = "https://api.talkjs.com";

// Modify these to those found in the TalkJS dashboard (https://talkjs.com/dashboard)
const appId = "your_app_id";
const secretKey = "sk_test...";

const sourceApp = {
    id: appId,
    secretKey: secretKey,
};

async function doWork(source) {
    const limit = 100;
    let users = await listResources({ app: source, resource: "users", limit });
    let conversations = await listResources({ app: source, resource: "conversations", limit });
    let usersJsonString = JSON.stringify(users);
    let conversationsJsonString = JSON.stringify(conversations);

    let allMessages = [];
    for (let conversation of conversations) {
        const messages = await listResources({ app: source, resource: `conversations/${conversation.id}/messages`, limit });
        allMessages.push(messages);
    }

    let allMessagesJsonString = JSON.stringify(allMessages);

    fs.writeFileSync(`${source.id}-users.json`, usersJsonString);
    fs.writeFileSync(`${source.id}-conversations.json`, conversationsJsonString);
    fs.writeFileSync(`${source.id}-messages.json`, allMessagesJsonString);
}

async function listResources({ app, resource, lastId, limit }) {
    const paginateMaybe = lastId ? `&startingAfter=${lastId}` : "";
    const path = host + `/v1/${app.id}/${resource}?limit=${limit}${paginateMaybe}`;
    let resources = await doRequest(path, app.secretKey, "GET");
    if (resources.length === limit) {
        const [last] = resources.slice(-1);
        const newOnes = await listResources({ app, resource, limit, lastId: last.id });
        resources = [...resources, ...newOnes];
    }
    return resources;
}
async function doRequest(path, secretKey, verb, body) {
    console.log("[TalkJS]", `Calling ${verb} ${path}.`);
    const response = await fetch(path, {
        method: verb,
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${secretKey}`
        }
    });

    // Wait 250ms between each request to keep within REST API rate limits
    await new Promise(resolve => setTimeout(resolve, 250));

    if (response.status === 200) {
        const result = await response.json();
        console.log("[TalkJS]", `Done calling ${verb} ${path}.`);
        return result.data;
    }
    else {
        const error = await response.text();
        console.warn("[TalkJS]", `Couldn't get ${verb} ${path}. Process it manually. Error: ${error}`);
        return [];
    }
}
doWork(sourceApp);
