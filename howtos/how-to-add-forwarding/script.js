// Fetches all conversations for a user ID from the backend
async function fetchUserConversations(userId) {
    try {
        const response = await fetch(`http://localhost:3000/conversations/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
  
        if (!response.ok) {
            throw new Error(`Error fetching conversations: ${response.statusText}`);
        }
  
        return await response.json();
    } catch (error) {
        console.error("Error fetching conversations:", error);
        return [];
    }
  }

// Sends a message to be forwarded to a selected conversation via the backend
async function forwardMessageToBackend(session, conversationId, messageToForward, conversationOrigin) {
    try {

        // Prepare the request body with the message, conversation, and sender details
        const requestBody = {
            messageText: messageToForward.body,
            senderId: session.me.id, 
            conversationId: conversationId,
            conversationOrigin: conversationOrigin,
        };

        // Send the message to the backend for forwarding
        const response = await fetch('http://localhost:3000/forward-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        console.log("Message forwarded successfully:", data);
    } catch(error) {
        console.error("Error forwarding message:", error);
    }
}

// Shows a modal with a list of conversations to select from
function showConversationSelectionModal(conversations, session, messageToForward, chatbox, currentConversationId) {
    const conversationList = document.getElementById('conversationList');
  
    // Clears existing conversation options
    conversationList.innerHTML = '';
  
    // Excludes the current conversation from the list
    const filteredConversations = conversations.filter(conversation => conversation.id !== currentConversationId);
  
    // Populates the modal with clickable conversation options
    filteredConversations.forEach(conversation => {
        const conversationOption = document.createElement('div');
        conversationOption.className = "flex items-center p-2 cursor-pointer hover:bg-gray-100 rounded";
  
        // Handles click event to select this conversation
        conversationOption.onclick = function() {
          console.log("Select conversation:", conversation.subject);
          selectedConversationId = conversation.id;
  
          // Highlights the selected conversation
          document.querySelectorAll('#conversationList div').forEach(div => div.classList.remove('bg-gray-200'));
          conversationOption.classList.add('bg-gray-200');
        };
  
        // Adds conversation image and title
        const img = document.createElement('img');
        img.src = conversation.photoUrl;
        img.alt = conversation.subject;
        img.className = "w-8 h-8 rounded-full mr-2";
  
        const span = document.createElement('span');
        span.innerText = conversation.subject;
        span.className = "text-gray-900";
  
        conversationOption.appendChild(img);
        conversationOption.appendChild(span);
        conversationList.appendChild(conversationOption);
    });
  
    // Shows the modal
    document.getElementById('forwardModal').classList.remove('hidden');
  
    // Attaches an event listener to the forward button
    document.querySelector("#forwardModal button[type='submit']").onclick = (event) => {
      forwardMessage(event, session, messageToForward, chatbox.currentConversation?.id || null);
    };
  }

// Handles forwarding a message
function forwardMessage(event, session, messageToForward, conversationOrigin) {
    // Prevents the default form submission behavior
    event.preventDefault();

    // Ensures that a conversation has been selected
    if (!selectedConversationId) {
        alert("Please select a conversation to forward the message to.");
        return;
    }

    // Forwards the message using the selected conversation ID
    forwardMessageToBackend(session, selectedConversationId, messageToForward, conversationOrigin);

    // Reset the selected conversation ID and close the modal
    selectedConversationId = null;
    closeModal();
}

// Initializes TalkJS chat with two sample users
Talk.ready.then(async function () {
    // Creates the current user, another user, and start a session
    const me = new Talk.User({
        id: 'almudena',
        name: 'Almudena',
        photoUrl: 'https://talkjs.com/new-web/avatar-7.jpg',
        welcomeMessage: 'Hi!',
        role: 'default',
    });
  
    const session = new Talk.Session({
        appId: '<APP_ID>', // Replace with your own app ID
        me: me,
    });
  
    const other = new Talk.User({
        id: 'dani',
        name: 'Dani',
        photoUrl: 'https://talkjs.com/new-web/avatar-1.jpg',
        welcomeMessage: 'Hey, did you get the report?',
        role: 'default',
    });
  
    // Creates a conversation between the users 'me' and 'other'
    const conversationId = Talk.oneOnOneId(me, other);
    const conversation = session.getOrCreateConversation(conversationId);
    conversation.setParticipant(me);
    conversation.setParticipant(other);
    conversation.setAttributes({subject: "Reporting"});
    conversation.setAttributes({photoUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74"});
  
    // Initializes the inbox and display the conversation
    const inbox = session.createInbox();
    inbox.select(conversation);
    inbox.mount(document.getElementById('talkjs-container'));

	// Tracks the message to be forwarded
	let messageToForward = null;

	// Handles showing the forwarding modal
	inbox.onCustomMessageAction('forward', async (event) => {
    	console.log("Forward action initiated:", event);
    	console.log("Message to forward:", event.message);
    	messageToForward = event.message;

    	// Fetches the current user's conversations and show the modal
    	const conversations = await fetchUserConversations(me.id);
    	showConversationSelectionModal(conversations, session, messageToForward, inbox, conversationId);
	});
});
ß
// Closes the forwarding modal
function closeModal() {
    document.getElementById('forwardModal').classList.add('hidden');
}  
