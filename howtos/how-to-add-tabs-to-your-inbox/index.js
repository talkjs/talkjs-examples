Talk.ready.then(function () {

    // Define current user
    const me = new Talk.User({
      id: "rizal",
      name: "Rizal",
    });
   
    // Initialize the TalkJS session
    const talkSession = new Talk.Session({
      appId: '<APP_ID>',
      me: me,
    });
 
    // Add other user
    const oya = new Talk.User({
      id: 'oya',
      name: 'Oya',
    });
 
    const jinfeng = new Talk.User({
      id: 'jinfeng',
      name: 'Jinfeng',
    });
 
     // Get or create the conversation
    const conversation = talkSession.getOrCreateConversation('summer-hike');
   
    // Set the conversation participants
    conversation.setParticipant(me);
    conversation.setParticipant(oya);
    conversation.setParticipant(jinfeng);
 
     // Function to add the conversation type
    function updateConversationType(conversation) {
      const participantCount = Object.keys(conversation.participants).length;
      console.log(conversation.participants);
 
       // Set the conversation type based on the number of participants 
      const conversationType = participantCount > 2 ? 'group' : 'dm';
     
      // Update the custom attribute 'type' on the conversation
      conversation.setAttributes({
        custom: { type: conversationType }
      });
    }

        // Define filters for each tab
        const filters = {
            chat: {},
            contacts: { custom: { type: ["==", "dm"] } },
            groups: { custom: { type: ["==", "group"] } }
        };
    
        // Set chat as the default tab
        let tab = 'chat';
    
        // Handle tab switching
        const tabButtons = {
            'tab-chat': 'chat',
            'tab-contacts': 'contacts',
            'tab-groups': 'groups',
        };
    
        Object.keys(tabButtons).forEach(tabId => {
        document.getElementById(tabId).addEventListener("click", () => {
                tab = tabButtons[tabId];
                inbox.setFeedFilter(filters[tab]);
                inbox.select(null);
                setActiveTab(tabId);
            });
        });
    
        // Set active tab style
        function setActiveTab(activeTabId) {
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active-tab'));
            document.getElementById(activeTabId).classList.add('active-tab');
        }
 
     // Create the inbox, select the conversation, mount the UI
    const inbox = talkSession.createInbox();
    inbox.select(conversation);
    inbox.mount(document.getElementById('talkjs-container'));
  });
 