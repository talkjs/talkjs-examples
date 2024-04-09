Talk.ready.then(() => {
  const me = new Talk.User({
    id: "0001",
    name: "Mikaela Ross",
    email: "mikaela.ross@example.com",
    photoUrl: "https://talkjs.com/images/avatar-7.jpg",
    role: "default"
  });

  const other1 = new Talk.User({
    id: "0002",
    name: "Thomas River",
    email: "thomas.river@example.com",
    photoUrl: "https://talkjs.com/images/avatar-5.jpg",
    role: "default"
  });

  const other2 = new Talk.User({
    id: "0003",
    name: "Kirsten Doe",
    email: "kirsten.doe@example.com",
    photoUrl: "https://talkjs.com/images/avatar-1.jpg",
    role: "default"
  });

  const other3 = new Talk.User({
    id: "0004",
    name: "James Fayland",
    email: "james.fayland@example.com",
    photoUrl: "https://talkjs.com/images/avatar-4.jpg",
    role: "default"
  });

  window.talkSession = new Talk.Session({
    appId: "<YOUR_APP_ID>",
    me: me,
  });

  let conversation1 = talkSession.getOrCreateConversation("customStyleChat1");
  let conversation2 = talkSession.getOrCreateConversation("customStyleChat2");
  let conversation3 = talkSession.getOrCreateConversation("customStyleChat3");

  conversation1.setParticipant(me);
  conversation1.setParticipant(other1);

  conversation2.setParticipant(me);
  conversation2.setParticipant(other2);

  conversation3.setParticipant(me);
  conversation3.setParticipant(other3);

  const chatbox1 = talkSession.createChatbox({
    theme: {
      custom: {
        accentColor: '#EE4B2B',
      },
    },
  });

  const chatbox2 = talkSession.createChatbox({
    theme: {
      custom: {
        accentColor: '#E69597',
      },
    },
  });

  const chatbox3 = talkSession.createChatbox({
    theme: {
      custom: {
        accentColor: '#56AE57',
      },
    },
  });
  
  chatbox1.select(conversation1);
  chatbox2.select(conversation2);
  chatbox3.select(conversation3);
   
  chatbox1.mount(document.getElementById("talkjs-container-1"));
  chatbox2.mount(document.getElementById("talkjs-container-2"));
  chatbox3.mount(document.getElementById("talkjs-container-3"));
});