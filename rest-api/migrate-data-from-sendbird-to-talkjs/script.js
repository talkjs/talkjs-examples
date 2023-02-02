Talk.ready.then(function () {
  var me = new Talk.User({
    id: "523915",
    name: "Mathew Jacob"
  });
  var other1 = new Talk.User({
    id: "523916",
    name: "Morgan Stanley"
  });
  var other2 = new Talk.User({
    id: "523917",
    name: "Shane Riley"
  });
  var other3 = new Talk.User({
    id: "523918",
    name: "Clyde Howell"
  });
  window.talkSession = new Talk.Session({
    appId: "YOUR_APP_ID",
    me: me
  });

  var conversation = window.talkSession.getOrCreateConversation(
    "sendbird_group_channel_229583953_53183fc50174e861b9a7d5c6684636dc94922349"
  );
  conversation.setParticipant(me);
  conversation.setParticipant(other1);
  conversation.setParticipant(other2);
  conversation.setParticipant(other3);

  var chatbox = window.talkSession.createChatbox(conversation);
  chatbox.mount(document.getElementById("talkjs-container"));
});