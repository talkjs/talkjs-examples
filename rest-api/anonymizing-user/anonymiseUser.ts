import fetch from "node-fetch";

// OPTIONS:
// appId can be found in your TalkJS Dashboard
const appId = "<APP_ID>";
// secretKey can be found in your TalkJS Dashboard
const secretKey = "<SECRET_KEY>";
// userId is the id that you pass in `Talk.User({ id: <USER_ID> })` code.
const userId = "<USER_ID>";
// this setting determines if you want to anonymize only messages 
// sent by the aforementioned user (<USER_ID>) or all messages 
// from conversations that this users is a part of should be anonymized
const cleanupOnlyUsersMessages = true;
// should the conversation's metadata that the user is a part of be anonymized (including `photoUrl`, `subject` and `custom`)
const cleanupConverstions = true;

// do not change `host` variable
const host = "https://api.talkjs.com";

interface App {
    id: string;
    secretKey: string;
};

interface User {
    id: string| null,
    name: string| null,
    email: string[]| null,
    phone: string[] | null,
    welcomeMessage: string | null;
    photoUrl: string | null;
    role?: string | null;
    custom?: {[name: string]: string | null } | null;
    availabilityText?: string | null;
    locale?: string | null;
};

interface Conversation {
    id: string;
    participants: Array<string>;
    subject: string | null;
    welcomeMessages: Array<string> | null;
    custom: {[name: string]: string | null } | null;
    photoUrl: string | null;
};

const sourceApp: App = {
    id: appId,
    secretKey: secretKey
};

async function anynomizeUserData(app: App, userId: string) {
    const user: User = {
        id: userId,
        name: "[DELETED]",
        email: null,
        phone: null,
        custom: null,
        welcomeMessage: null,
        photoUrl: null,
        role: null,
        availabilityText: null,
        locale: null
    };

    // anonymize user
    await put({app, resource: `users/${userId}`, record: user});
    
    // list all conversations of the application
    let conversations = await listResources({app: app, resource: `users/${userId}/conversations`, limit: 100});
    
    for(let conversation of conversations) {

        if(cleanupConverstions) {
            const c: Conversation = {
                id: conversation.id,
                participants: [userId],
                subject: "[DELETED]",
                photoUrl: null,
                custom: null,
                welcomeMessages: null
            };
            
            // clean up conversation metadata if `cleanupConversations` is set to true
            await put({app, resource: `conversations/${c.id}`, record: c});   
        }

        // list all messages of `conversation`
        const messages = await listResources({app: app, resource: `conversations/${conversation.id}/messages`, limit: 100});

        for(let message of messages) {
            const m = {
                custom: null,
                text: "[DELETED]"
            };
            // if `cleanupOnlyUsersMessages` is set and message was sent by a user with <USER_ID> anonymize it 
            if(cleanupOnlyUsersMessages) {
                if(message.senderId === userId) {
                    await put({app, resource: `conversations/${conversation.id}/messages/${message.id}`, record: m});
                }
            }
            // anonymize all messages from the given conversation if `cleanupOnlyUsersMessages` is not set
            else {
                await put({app, resource: `conversations/${conversation.id}/messages/${message.id}`, record: m});
            }
        }
    }
}

async function listResources({app, resource, lastId, limit}:{app: App, resource: string, lastId?: string, limit: number}) {
    const paginateMaybe = lastId ? `&startingAfter=${lastId}` : "";
    const path = host + `/v1/${app.id}/${resource}?limit=${limit}${paginateMaybe}`;
    
    let resources = await doRequest(path, app.secretKey, "GET");
    
    if(resources.length === limit) {
        const [last] = resources.slice(-1);
        const newOnes = await listResources({app, resource, limit, lastId: last.id});
        resources = [...resources, ...newOnes];
    }
    return resources;
}

async function put({ app, resource, record }: { app: App, resource: string, record: { [key: string]: any}}) {
    const path = host + `/v1/${app.id}/${resource}`;
    await doRequest(path, app.secretKey, "PUT", record);
}

async function doRequest(path: string, secretKey: string, verb: string, body?: { [key: string]: any}): Promise<Array<any>> {
    console.log("[TalkJS]", `Calling ${verb} ${path}.`);
    const response = await fetch(path,{
        method: verb,
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${secretKey}`
        }
    });
    if(response.status === 200) {
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

anynomizeUserData(sourceApp, userId);
