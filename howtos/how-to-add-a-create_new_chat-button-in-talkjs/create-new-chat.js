const $targetEl = document.getElementById('crud-modal');
const modal = new Modal($targetEl);
const appId = "<Add your App ID here!>";

Talk.ready.then(function () {
    const me = new Talk.User({
        id: '123457',
        name: 'Alice',
        email: 'alice@example.com',
        photoUrl: 'https://talkjs.com/images/avatar-1.jpg',
        role: 'default',
        welcomeMessage: 'Hey there! How are you? :-)',
    });
    window.talkSession = new Talk.Session({
        appId: appId,
        me: me,
    });
    const other = new Talk.User({
        id: '654321',
        name: 'Sebastian',
        email: 'Sebastian@example.com',
        photoUrl: 'https://talkjs.com/images/avatar-5.jpg',
        role: 'default',
        welcomeMessage: 'Hey, how can I help?',
    });

    const conversation = talkSession.getOrCreateConversation(
        Talk.oneOnOneId(me, other)
    );
    conversation.setParticipant(me);
    conversation.setParticipant(other);

    //Create some test users for this example.
    let testUsers = getTalkJSUsers()
    for(let id in testUsers){
        let user = new Talk.User(testUsers[id]);
        conversation.setParticipant(user);
    }

    const inbox = talkSession.createInbox({ theme: 'Create-New-Chat-From-Conv-Header' });
    inbox.select(conversation);
    inbox.mount(document.getElementById('talkjs-container'));

    inbox.onCustomConversationAction('createNewChat', (event) => {
        showNewConversationModal()
    });
});

function createNewChat(event) {
    event.preventDefault();
    const conv_id = "" + Date.now();
    const conversation = talkSession.getOrCreateConversation(conv_id);
    const me = new Talk.User(talkSession.me.id);
    conversation.setParticipant(me);

    // Get the selected values from the multi-select dropdown
    let selectElement = document.getElementById('participants');
    for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].selected) {
            let user = new Talk.User(selectElement.options[i].value);
            conversation.setParticipant(user);
        }
    }

    if (event.target.elements.subject.value) {
        conversation.setAttributes({
            subject: event.target.elements.subject.value
        });
    }
    let inbox = talkSession.createInbox({ theme: 'Create-New-Chat-From-Conv-Header' });
    inbox.select(conversation);
    inbox.mount(document.getElementById('talkjs-container'));

    modal.hide();

    return false
}

function showNewConversationModal() {
    let talkJsUsers = getTalkJSUsers();

    participantsSelect = document.getElementById('participants');

    for (let i = 0; i < talkJsUsers.length; i++) {
        participantsSelect.options[i] = new Option(talkJsUsers[i].name, talkJsUsers[i].id);
    }

    modal.show();
}

function getTalkJSUsers() {
    return [
        {
            id: "New_Zafar",
            name: "Zafar",
            role: "default",
            email: "sapnesh+Zafar_talkjs@test.com",
            photoUrl: "https://i.pravatar.cc/150?u=sapnesh+Zafar_talkjs@test.com",
        },
        {
            id: "New_Simba",
            name: "Simba",
            role: "default",
            email: "sapnesh+Simba_talkjs@test.com",
            photoUrl: "https://i.pravatar.cc/150?u=sapnesh+Simba_talkjs@test.com",
        },
        {
            id: "New_Xiang",
            name: "Xiang",
            role: "default",
            email: "sapnesh+Xiang_talkjs@test.com",
            photoUrl: "https://i.pravatar.cc/150?u=sapnesh+Xiang_talkjs@test.com",
        },
        {
            id: "New_Patel",
            name: "Patel",
            role: "default",
            email: "sapnesh+Patel_talkjs@test.com",
            photoUrl: "https://i.pravatar.cc/150?u=sapnesh+Patel_talkjs@test.com",
        },
        {
            id: "New_Sapnesh",
            name: "Sapnesh",
            role: "default",
            email: "sapnesh+Sapnesh_talkjs@test.com",
            photoUrl: "https://i.pravatar.cc/150?u=sapnesh+Sapnesh_talkjs@test.com",
        }
    ];
}