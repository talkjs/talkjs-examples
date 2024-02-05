const $targetEl = document.getElementById('crud-modal');
const modal = new Modal($targetEl)
const appId = "<Add Your TalkJS APP ID Here>"
const api_token = "<Add Your TalkJS REST API Token Here>"


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

    var inbox = talkSession.createInbox({theme: 'Create-New-Chat-From-Conv-Header'});
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
    var inbox = talkSession.createInbox({theme: 'Create-New-Chat-From-Conv-Header'});
    inbox.select(conversation);
    inbox.mount(document.getElementById('talkjs-container'));

    modal.hide()

    return false
}

function showNewCoonversationModal() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + api_token);

    var requestOptions = {
        headers: myHeaders
    };

    fetch("https://api.talkjs.com/v1/" + appId + "/users", requestOptions)
        .then(response => response.json())
        .then((results) => {
            participantsSelect = document.getElementById('participants');

            for (var i = 0; i < results.data.length; i++) {
                participantsSelect.options[i] = new Option(results.data[i].name, results.data[i].id);
            }

            modal.show()

        })
        .catch(error => console.log('error', error));
}