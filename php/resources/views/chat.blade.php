<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet"/>


    <style>
        #contacts-list {
            overflow-y: auto;
            width: 300px;
            padding: 20px 40px;
            height: 460px;
            background-color: #ECECEC;
        }

        .contact-container {
            height: 50px;
            display: flex;
            margin: 5px 0;
            padding: 5px 0;
            cursor: pointer;
        }

        .contact-container:hover {
            background-color: #fff;
        }

        .contact-name {
            padding: 0px 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }
    </style>

</head>
<body>

  <a href="{{route('chat')}}">TalkJS Chat</a>

<script>
    (function (t, a, l, k, j, s) {
        s = a.createElement('script');
        s.async = 1;
        s.src = "https://cdn.talkjs.com/talk.js";
        a.head.appendChild(s)
        ;k = t.Promise;
        t.Talk = {
            v: 3, ready: {
                then: function (f) {
                    if (k) return new k(function (r, e) {
                        l.push([f, r, e])
                    });
                    l
                        .push([f])
                }, catch: function () {
                    return k && new k()
                }, c: l
            }
        };
    })(window, document, []);
</script>


<div style="display: flex; justify-content: center; align-items: center;">

    <!-- container element in which TalkJS will display a chat UI -->
    <div id="talkjs-container" style="width: 40%; margin: 30px; height: 500px;">
        <i>Loading chat...</i>
    </div>
    <div id="contacts-list">
        <h2>Contacts</h2>
    </div>

</div>


<script type="text/javascript">

    const otherUsers = @json($users);
    const contactsWrapper = document.getElementById('contacts-list');
    // Traversing through users to show the list
    for (let user of otherUsers) {
        const id = user.id;
        const username = user.name;

        const usernameDiv = document.createElement('div');
        usernameDiv.classList.add('contact-name');
        usernameDiv.innerText = username;

        const contactContainerDiv = document.createElement('div');
        contactContainerDiv.classList.add('contact-container');

        contactContainerDiv.appendChild(usernameDiv);

        contactsWrapper.appendChild(contactContainerDiv);
    }


    const currentUser = @json(auth()->user());

    Talk.ready.then(function () {
        let me = new Talk.User({
            id: currentUser.id,
            name: currentUser.name,
        });

        window.talkSession = new Talk.Session({
            appId: '<APP_ID>',
            me: me,
        });

        const chatbox = talkSession.createChatbox();
        chatbox.mount(document.getElementById('talkjs-container'));

        const conversations = otherUsers.map(function (user, index) {
            const otherUser = new Talk.User(user);

            conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, otherUser));

            conversation.setParticipant(me);
            conversation.setParticipant(otherUser);

            return conversation;

        });

        let contactsListDivs = document.getElementsByClassName('contact-container');
        conversations.forEach(function (conversation, index) {
            contactsListDivs[index].addEventListener('click', function () {
                chatbox.select(conversation);
            });
        });

    });
</script>
</body>
</html>
