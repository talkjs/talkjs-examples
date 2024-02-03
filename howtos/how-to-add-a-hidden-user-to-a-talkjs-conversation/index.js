let conversation;

Talk.ready.then(() => {
  const me = new Talk.User({
    id: "0001",
    name: "Kirsten Doe",
    email: "kirsten.doe@example.com",
    photoUrl: "https://talkjs.com/images/avatar-1.jpg",
    custom: {
      "hidden":"true"
    },
    role: "default"
  });

  const other1 = new Talk.User({
    id: "0002",
    name: "Mikaela Ross",
    email: "mikaela.ross@example.com",
    photoUrl: "https://talkjs.com/images/avatar-7.jpg",
    custom: {
      "hidden":"false"
    },
    role: "default"
  });

  const other2 = new Talk.User({
    id: "0003",
    name: "Thomas River",
    email: "thomas.river@example.com",
    photoUrl: "https://talkjs.com/images/avatar-5.jpg",
    custom: {
      "hidden":"false"
    },
    role: "default"
  });

  const other3 = new Talk.User({
    id: "0004",
    name: "James Fayland",
    email: "james.fayland@example.com",
    photoUrl: "https://talkjs.com/images/avatar-4.jpg",
    custom: {
      "hidden":"false"
    },
    role: "default"
  });
  window.talkSession = new Talk.Session({
    appId: "<YOUR_APP_ID>",
    me: me,
  });

  conversation = talkSession.getOrCreateConversation("group-conversation-1");

  conversation.setParticipant(me);
  conversation.setParticipant(other1);
  conversation.setParticipant(other2);
  conversation.setParticipant(other3);

  const chatbox = talkSession.createInbox();
  
  chatbox.select(conversation);
  chatbox.mount(document.getElementById("talkjs-container"));
});
