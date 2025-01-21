const appId = "<APP_ID>"; // Replace with your app ID from the TalkJS dashboard

Talk.ready.then(function () {
  // Add users from example-data
  var alice = new Talk.User("alice-sendbird");
  var sebastian = new Talk.User("sebastian-sendbird");
  var nina = new Talk.User("nina-sendbird");
  window.talkSession = new Talk.Session({
    appId: appId,
    me: alice,
  });

  // Add conversation from example-data
  var conversation = window.talkSession.getOrCreateConversation(
    "sendbird_group_channel_483424280_ac14e7e8e6d5b3bc2dd3979fb360ad432ae0d6e9"
  );
  conversation.setParticipant(alice);
  conversation.setParticipant(sebastian);
  conversation.setParticipant(nina);

  var chatbox = window.talkSession.createChatbox(conversation);
  chatbox.mount(document.getElementById("talkjs-container"));
});
