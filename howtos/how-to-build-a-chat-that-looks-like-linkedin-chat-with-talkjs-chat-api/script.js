Talk.ready.then(function() {
    // var other = new Talk.User({
    //     id: "123456",
    //     name: "Alice",
    //     email: "alice@example.com",
    //     photoUrl: "https://randomuser.me/api/portraits/women/72.jpg",
    //     welcomeMessage: "Hey, how can I help?",
    //     role: "default"
    // });
    var other = new Talk.User({
        id: "654323",
        name: "Jack Hendlin",
        email: "jhendlin@example.com",
        photoUrl: "https://randomuser.me/api/portraits/men/24.jpg",
        welcomeMessage: "Hi",
        role: "original"
    });
    var me = new Talk.User({
        id: "654324",
        name: "Julia Tan",
        email: "jtan@example.com",
        photoUrl: "https://randomuser.me/api/portraits/women/3.jpg",
        welcomeMessage: "Hi",
        role: "original"
    });

    window.talkSession = new Talk.Session({
        appId: "YOUR_APP_ID_HERE",
        me: me
    });


    var conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other))
    conversation.setParticipant(me);
    conversation.setParticipant(other);

    var inbox = talkSession.createChatbox(conversation);
    inbox.mount(document.getElementById("talkjs-container"));
});


