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

const popupInboxContainer = document.getElementById("popup-inbox-container");
const talkjsContainer = document.getElementById("talkjs-container");
const popupTriggerBtn = document.getElementById("popup-trigger-btn");

const appId = "<APP_ID>"; // replace with your app ID
const currentUser = {
  id: "1234",
  name: "me",
  email: "me@email.com",
  photoUrl: "https://talkjs.com/images/avatar-1.jpg",
  welcomeMessage: "What`s up?",
  role: "default",
};

const currentConversation = {
  id: "conversation_0",
  subject: "Chat with Bob The Builder",
  user: {
    id: "user_0",
    name: "Bob The Builder",
    email: ["bobthebuilder@email.com"],
    photoUrl: "https://talkjs.com/images/avatar-2.jpg",
    role: "default",
    welcomeMessage: "Can we fix it? ⚒️",
  },
};

Talk.ready.then(() => {
  let selectedConversation;
  const me = new Talk.User(currentUser);
  window.talkSession = new Talk.Session({ appId, me });

  if (!selectedConversation) {
    popupInboxContainer.classList.add("hidden");
  }

  function initChat(convItem) {
    if (!popupInboxContainer.classList.contains("hidden")) {
      popupInboxContainer.classList.add("hidden");
      return;
    }
    popupInboxContainer.classList.remove("hidden");

    selectedConversation = convItem;
    const conversation = talkSession.getOrCreateConversation(
      selectedConversation.id
    );

    conversation.setParticipant(me);
    const otherUser = new Talk.User(convItem.user);
    conversation.setParticipant(otherUser);
    conversation.setAttributes({ subject: selectedConversation.subject });

    const inbox = talkSession.createInbox({
      selected: conversation,
    });
    inbox.mount(talkjsContainer);
    popupTriggerBtn.classList.remove("hidden");
  }

  popupTriggerBtn.addEventListener("click", () => {
    initChat(currentConversation);
  });
});
