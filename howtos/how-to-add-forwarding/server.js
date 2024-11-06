import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

const basePath = "https://api.talkjs.com";

app.use(express.json());
app.use(cors());

// Replace with your own app ID and secret key
const appId = '<APP_ID>'
const secretKey = '<SECRET_KEY>'

// Fetches conversations for a specific user
async function getUserConversations(userId) {
    const url = `${basePath}/v1/${appId}/users/${userId}/conversations`;
 
    try {
        // Makes a GET request to TalkJS REST API
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${secretKey}`,
                'Content-Type': 'application/json',
            },
        });
 
        if (!response.ok) {
            throw new Error(`Error fetching conversations: ${response.statusText}`);
        }
 
        const data = await response.json();
 
        // Extracts relevant fields for each conversation
        const conversations = data.data.map(conversation => ({
            id: conversation.id,
            photoUrl: conversation.photoUrl,
            subject: conversation.subject
        }));
 
        return conversations;
 
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
 }


// Endpoint to get conversations for a specific user
app.get('/conversations/:userId', async (req, res) => {
    const { userId } = req.params;
 
    // Fetch the conversations
    const conversations = await getUserConversations(userId);
 
    res.json(conversations);
 }); 

 // Endpoint to handle forwarding a message to a selected conversation
app.post('/forward-message', async (req, res) => {
	console.log("Received POST request:", req.body);

	const { messageText, senderId, conversationId, conversationOrigin } = req.body;

	// Prepares the request body for the TalkJS REST API
	const requestBody = [
    	{
        	"text": messageText,
        	"sender": senderId,
        	"type": "UserMessage",
        	"custom": {
            		"forwardedFrom": conversationOrigin,
        	}
    	}
	];

	console.log(requestBody);
    
	// Constructs the URL to send a message to the selected conversation
	const url = `${basePath}/v1/${appId}/conversations/${conversationId}/messages`;

	try {
    	// Makes a POST request to the TalkJS REST API to send the message
    	const response = await fetch(url, {
        	method: 'POST',
        	headers: {
            	'Content-Type': 'application/json',
            	'Authorization': `Bearer ${secretKey}`
        	},
        	body: JSON.stringify(requestBody)
    	});

    	const responseText = await response.text();

    	if (!response.ok) {
        	console.error("TalkJS REST API error:", response.status, responseText);
        	return res.status(response.status).json({ success: false, message: "Failed to send message", error: responseText });
    	}

    	const responseData = JSON.parse(responseText);
    	console.log("Message sent successfully via the REST API:", responseData);

    	// Responds back to the client
    	res.json({ success: true, message: "Message forwarded and sent", data: responseData });

	} catch (error) {
    	console.error("Error sending message via the REST API:", error);
    	res.status(500).json({ success: false, message: "Internal server error" });
	}
});

// Starts the Express server
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});

// EVERYTHING BELOW IS SETUP CODE FOR THIS EXAMPLE
// You won't need any of it in your live app!

// Sets up a new conversation with the current user and an example user
async function setupConversation(i) {
	const conversationId = `exampleConversation${i}`;
	const userId = `exampleUser${i}`;
  
	// Delete the conversation (if it exists)
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
		participants: ["almudena", userId],
		subject: `Conversation ${i}`,
		photoUrl: "https://images.unsplash.com/photo-1718761261817-66116cbfa411",
	  }),
	});
  
	// Send a message to make the conversation show up in the list
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
			text: "Hi there!",
			sender: userId,
			type: "UserMessage",
		  },
		]),
	  }
	);
}
  
async function setup() {

const almudena = fetch(
	`${basePath}/v1/${appId}/users/almudena`,
	{
		method: "PUT",
		headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${secretKey}`,
		},
		body: JSON.stringify({
		name: "Almudena",
		photoUrl: "https://talkjs.com/images/avatar-7.jpg",
		welcomeMessage: "Hi!",
		role: "default",
		}),
	}
	);

const user1 = fetch(
	`${basePath}/v1/${appId}/users/exampleUser1`,
	{
	method: "PUT",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${secretKey}`,
	},
	body: JSON.stringify({
		name: "Gül",
		photoUrl: "https://talkjs.com/images/avatar-2.jpg",
		welcomeMessage: "Hi!",
		role: "default",
	}),
	}
);

const user2 = fetch(
	`${basePath}/v1/${appId}/users/exampleUser2`,
	{
	method: "PUT",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${secretKey}`,
	},
	body: JSON.stringify({
		name: "Nina",
		photoUrl: "https://talkjs.com/images/avatar-3.jpg",
		welcomeMessage: "Hello!",
		role: "default",
	}),
	}
);

await almudena;
await user1;
await user2;

const conv1 = setupConversation(1);
const conv2 = setupConversation(2);

await conv1;
await conv2;
}

setup();

