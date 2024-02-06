const $targetEl = document.getElementById('crud-modal');
const modal = new Modal($targetEl)
const appId = "<Add Your TalkJS APP ID Here>"

Talk.ready.then(function () {
    var me = new Talk.User({
        id: '123457',
        name: 'Alice',
        email: 'alice@example.com',
        photoUrl: 'https://talkjs.com/images/avatar-1.jpg',
        welcomeMessage: 'Hey there! How are you? :-)',
    });
    window.talkSession = new Talk.Session({
        appId: appId,
        me: me,
    });
    var other = new Talk.User({
        id: '654321',
        name: 'Sebastian',
        email: 'Sebastian@example.com',
        photoUrl: 'https://talkjs.com/images/avatar-5.jpg',
        welcomeMessage: 'Hey, how can I help?',
    });

    var conversation = talkSession.getOrCreateConversation(
        Talk.oneOnOneId(me, other)
    );
    conversation.setParticipant(me);
    conversation.setParticipant(other);

    var inbox = talkSession.createInbox({ theme: 'Create-New-Chat-From-Conv-Header' });
    inbox.select(conversation);
    inbox.mount(document.getElementById('talkjs-container'));

    inbox.onCustomConversationAction('createNewChat', (event) => {
        showNewCoonversationModal()
    });
});

function createNewChat(event) {
    event.preventDefault()
    const conv_id = "" + Date.now()
    const conversation = talkSession.getOrCreateConversation(conv_id);
    me = new Talk.User(talkSession.me.id)
    conversation.setParticipant(me);

    // Get the selected values from the multi-select dropdown
    var selectElement = document.getElementById('participants');
    for (var i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].selected) {
            var user = new Talk.User(selectElement.options[i].value);
            conversation.setParticipant(user);
        }
    }

    if (event.target.elements.subject.value) {
        conversation.setAttributes({
            subject: event.target.elements.subject.value
        });
    }
    var inbox = talkSession.createInbox({ theme: 'Create-New-Chat-From-Conv-Header' });
    inbox.select(conversation);
    inbox.mount(document.getElementById('talkjs-container'));

    modal.hide()

    return false
}

function showNewCoonversationModal() {
    var talkJsUsers = getTalkJSUsers()

    participantsSelect = document.getElementById('participants');

    for (var i = 0; i < talkJsUsers.length; i++) {
        participantsSelect.options[i] = new Option(talkJsUsers[i].name, talkJsUsers[i].id);
    }

    modal.show()
}

function getTalkJSUsers() {
    return [
        { id: "123457", name: "Alice" },
        { id: "Zafar", name: "Zafar" },
        { id: "Simba", name: "Simba" },
        { id: "Xiang", name: "Xiang" },
        { id: "Patel", name: "Patel" },
        { id: "Sapnesh", name: "Sapnesh" },
        { id: "Irwin", name: "Irwin" },
        { id: "Adams", name: "Adams" },
        { id: "sample_user_alice", name: "Alice" },
        { id: "sample_user_sebastian", name: "Sebastian" },
    ]
}