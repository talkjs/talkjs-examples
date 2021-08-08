Talk.ready.then(function() {
    var me = new Talk.User({
        id: "123456",
        name: "Alice",
        email: "alice@example.com",
        photoUrl: "https://randomuser.me/api/portraits/women/72.jpg",
        welcomeMessage: "Hey, how can I help?",
        role: "default"
    });
    window.talkSession = new Talk.Session({
        appId: "tAU5JKLC",
        me: me
    });
    var other = new Talk.User({
        id: "654321",
        name: "Sebastian",
        email: "Sebastian@example.com",
        photoUrl: "https://randomuser.me/api/portraits/men/9.jpg",
        welcomeMessage: "Hey, how can I help?",
        role: "default"
    });

    var conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other))
    conversation.setParticipant(me);
    conversation.setParticipant(other);

    var inbox = talkSession.createInbox({selected: conversation});
    inbox.mount(document.getElementById("talkjs-container"));
});
