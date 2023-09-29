(function (t, a, l, k, j, s) {
  s = a.createElement("script");
  s.async = 1;
  s.src = "https://cdn.talkjs.com/talk.js";
  a.head.appendChild(s);
  k = t.Promise;
  t.Talk = {
    v: 3,
    ready: {
      then: function (f) {
        if (k)
          return new k(function (r, e) {
            l.push([f, r, e]);
          });
        l.push([f]);
      },
      catch: function () {
        return k && new k();
      },
      c: l,
    },
  };
})(window, document, []);

const chatboxContainer = document.getElementById("chatbox-container");
const talkjsContainer = document.getElementById("talkjs-container");
const usersListContainer = document.getElementById("users-list-container");
const usersList = document.getElementById("users-list");
const userProfileContainer = document.getElementById("user-profile-container");
const openChatButton = document.getElementById("open-chat-btn");

let me;

Talk.ready.then(() => {
  me = new Talk.User(currentUser);
  window.talkSession = new Talk.Session({ appId, me });

  initChat = (user) => {
    userProfileContainer
      ? userProfileContainer.classList.add("hidden")
      : undefined;
    usersListContainer ? usersListContainer.classList.add("hidden") : undefined;
    chatboxContainer.classList.remove("hidden");

    const otherUser = new Talk.User(JSON.parse(decodeURIComponent(user)));
    const conversation = talkSession.getOrCreateConversation(
      Talk.oneOnOneId(me, otherUser)
    );

    conversation.setParticipant(me);
    conversation.setParticipant(otherUser);

    const inbox = talkSession.createInbox({
      selected: conversation,
    });
    inbox.mount(talkjsContainer);

    inbox.onCustomConversationAction("goToProfile", (event) => {
      console.log(event.params.userId);
      location.href = `/user-profile/${event.params.userId}`;
    });
  };
});
