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
const usersList = document.getElementById("users-list");
const popupTriggerBtn = document.getElementById("popup-trigger-btn");

const appId = "0RWGWLM5";
const currentUser = {
  id: "1234",
  name: "me",
  email: "me@email.com",
  photoUrl: "https://talkjs.com/images/avatar-1.jpg",
  welcomeMessage: "What`s up?",
  role: "default",
};

const conversationItems = [
  {
    id: "conversation_0",
    subject: "Chat with Bob The Builder",
    user: {
      id: "user_0",
      name: "Bob The Builder",
      email: ["bobthebuilder@email.com"],
      photoUrl: "https://talkjs.com/images/avatar-2.jpg",
      welcomeMessage: "Can we fix it? ⚒️",
    },
  },
  {
    id: "conversation_1",
    subject: "Chat with Ash Ketchum",
    user: {
      id: "user_1",
      name: "Ash Ketchum",
      email: ["ashketchum@email.com"],
      photoUrl: "https://talkjs.com/images/avatar-3.jpg",
      welcomeMessage: "Gotta catch `em all 👾",
    },
  },
  {
    id: "conversation_2",
    subject: "Chat with Patrick Star",
    user: {
      id: "user_2",
      name: "Patrick Star",
      email: ["patrickstar@email.com"],
      photoUrl: "https://talkjs.com/images/avatar-4.jpg",
      welcomeMessage: "Hi, this is Patrick ⭐",
    },
  },
];

Talk.ready.then(() => {
  let selectedConversation;
  let me = new Talk.User(currentUser);
  window.talkSession = new Talk.Session({ appId, me });

  if (!selectedConversation) {
    popupTriggerBtn.classList.add("hidden");
    popupInboxContainer.classList.add("hidden");
  }

  function initChat(convItem) {
    if (!popupInboxContainer.classList.contains("hidden")) {
      popupInboxContainer.classList.add("hidden");
      return;
    }
    popupInboxContainer.classList.remove("hidden");

    selectedConversation = convItem;
    const conversation = talkSession.getOrCreateConversation(selectedConversation.id);

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

  conversationItems.forEach((convo) => {
    const el = document.createElement("li");
    el.classList.add("flex", "justify-between", "gap-x-6", "py-5");
    el.innerHTML = `
          <div class="flex min-w-0 gap-x-4">
              <img class="h12 w12 flex-none rounded-full bg-gray-500" src="${convo.user.photoUrl}" alt="${convo.user.name}'s photo"/>
              <div class="min-w-0 flex flex-col justify-center">
                  <p class="text-sm font-semibold leading-6 text-gray-900">${convo.user.name}</p>
                  <p class="mt-1 truncate text-xs leading-5 text-gray-500">${convo.user.email}</p>
              </div>
          </div>
          <div class="flex flex-col justify-center">
          </div>`;
    const button = document.createElement("button");
    button.classList.add("px-4", "py-3", "font-semibold", "rounded-xl", "bg-blue-500", "text-white", "text-base", "hover:shadow-3xl", "hover:shadow-blue-500", "ease-in-out", "duration-200", "flex");
    button.addEventListener("click", () => initChat(convo));
    button.innerHTML = '<span class="grow">Chat</span> <i data-feather="arrow-right"></i>';
    el.children[1].append(button);
    usersList.appendChild(el);
  });

  popupTriggerBtn.addEventListener("click", () => {
    if (selectedConversation) {
      initChat(selectedConversation);
    }
  });

  feather.replace();
});
