import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Sets your TalkJS API key and app ID
const TALKJS_APP_ID = '<APP_ID>' // Replace with your own app ID
const TALKJS_API_KEY = '<API_KEY>' // Replace with your own API secret key

// Fetches conversations for a specific user
async function getUserConversations(userId) {
    const url = `https://api.talkjs.com/v1/${TALKJS_APP_ID}/users/${userId}/conversations`;
 
    try {
        // Makes a GET request to TalkJS REST API
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TALKJS_API_KEY}`,
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
	const url = `https://api.talkjs.com/v1/${TALKJS_APP_ID}/conversations/${conversationId}/messages`;

	try {
    	// Makes a POST request to the TalkJS REST API to send the message
    	const response = await fetch(url, {
        	method: 'POST',
        	headers: {
            	'Content-Type': 'application/json',
            	'Authorization': `Bearer ${TALKJS_API_KEY}`
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
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
