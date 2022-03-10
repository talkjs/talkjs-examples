
var options = JSON.parse(app.getOptions());

// this makes it easier to find the right webview in Chrome Devtools (nagivate to chrome://inspect)
document.title = options.uiType;

Talk.ready.then(function() {
    var me = new Talk.User(options.currentUser);

    window.talkSession = new Talk.Session({
        appId: options.appId,
        me: me
    });

    if(options.uiType === "inbox") {
        ui = createInbox();
    }
    else {
        ui = createChatbox(me, options);
    }

    ui.mount(document.getElementById("talkjs-container")).then(function() {
        app.showChatUi();
    });

}).catch(function(error) { 
    // ensure that errors are shown on the devtools console, even on old android versions.
    console.error(error); 
});

function createInbox() {
    var inbox = talkSession.createInbox({ selected: null, showMobileBackButton: false });

    inbox.onSelectConversation(function(event) {
        // This prevents the TalkJS inbox UI from actually opening the chat. Instead, we want to
        // open a new Android activity with a TalkJS chatbox UI, so that the navigation works as
        // users expect.
        event.preventDefault();

        // Tell the app to switch to the chatbox activity
        app.openConversation(event.conversation.id, event.others[0].name);
    });

    return inbox;
}

function createChatbox(me, options) {
    var conversation;

    if(options.conversationId) {
        // continuing a chat selected in the inbox
        conversation = talkSession.getOrCreateConversation(options.conversationId);
    }
    else if(options.chatWith) {
        // starting (or continuing) a conversation with a particular user
        var other = new Talk.User(options.chatWith);

        var conversationId = Talk.oneOnOneId(me, other);
        conversation = talkSession.getOrCreateConversation(conversationId);
        conversation.setParticipant(me);
        conversation.setParticipant(other);
    }

    return talkSession.createChatbox(conversation, {
        showChatHeader: false
    });
}
