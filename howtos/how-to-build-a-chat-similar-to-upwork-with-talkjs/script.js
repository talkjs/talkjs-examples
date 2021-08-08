Talk.ready.then(function() {
    var me = new Talk.User({
        id: "123456",
        name: "Alice John",
        email: "alice@example.com",
        photoUrl: "https://randomuser.me/api/portraits/women/72.jpg",
        role: "default"
    });
    var other = new Talk.User({
        id: "654321",
        name: "Jack Hendlin",
        email: "jhendlin@example.com",
        photoUrl: "https://randomuser.me/api/portraits/men/24.jpg",
        role: "default"
    });

    window.talkSession = new Talk.Session({
        appId: "tAU5JKLC",
        me: me
    });


    var conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other))
    conversation.setParticipant(me);
    conversation.setParticipant(other);
    conversation.setAttributes({subject: "Short tech article (howto) for a chat API product"});
    var chatbox = window.talkSession.createInbox(conversation);
    chatbox.mount(document.getElementById("talkjs-container"));
});


