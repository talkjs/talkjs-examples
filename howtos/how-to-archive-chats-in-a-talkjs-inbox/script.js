Talk.ready.then(function(){
    const me = new Talk.User({
        id: "654321",
        name: "Sebastian",
        email: "Sebastian@example.com",
        photoUrl: "https://randomuser.me/api/portraits/men/9.jpg",
        welcomeMessage: "Hey there! How are you? :-)",
        role: "original"
    });
    const session = new Talk.Session({
        appId: "YOUR_APP_ID_HERE",
        me: me
    });
    // const other = new Talk.User({
    //     id: "123457",
    //     name: "Teanna",
    //     email: "alice@example.com",
    //     photoUrl: "https://randomuser.me/api/portraits/women/73.jpg",    
    //     welcomeMessage: "Hey, how can I help?",
    //     role: "default"
    // });
    const other = new Talk.User({
        id: "123458",
        name: "Rico",
        email: "rico@example.com",
        photoUrl: "https://randomuser.me/api/portraits/men/33.jpg",
        welcomeMessage: "Hey, how can I help?",
        role: "original"
    });
    // const other = new Talk.User({
    //     id: "123456",
    //     name: "Alice",
    //     email: "alice@example.com",
    //     photoUrl: "https://randomuser.me/api/portraits/women/72.jpg",
    //     welcomeMessage: "Hey, how can I help?",
    //     role: "default"
    // });

    const conversation1 = session.getOrCreateConversation(Talk.oneOnOneId(me, other));
    conversation1.setAttributes({custom: { archived: "true", supportTopic: "gaming" }})
    conversation1.setAttributes({subject: "Gaming"});
    conversation1.setParticipant(me);
    conversation1.setParticipant(other);
    // const conversation2 = session.getOrCreateConversation(Talk.oneOnOneId(me, other));
    // conversation2.setAttributes({custom: { archived: "false", supportTopic: "connectivity" }})
    // conversation2.setAttributes({subject: "Connectivity"});
    // conversation2.setParticipant(me);
    // conversation2.setParticipant(other);
    // const conversation3 = session.getOrCreateConversation(Talk.oneOnOneId(me, other));
    // conversation3.setAttributes({custom: { archived: "true", supportTopic: "gaming" }})
    // conversation3.setAttributes({subject: "Gaming"});
    // conversation3.setParticipant(me);
    // conversation3.setParticipant(other);

    const inbox = session.createInbox({selected: conversation1});
    inbox.setFeedFilter({ custom: { archived: ["==", "false"], supportTopic: ["==", "gaming" ] } });
    inbox.mount(document.getElementById("talkjs-container"));  
})
