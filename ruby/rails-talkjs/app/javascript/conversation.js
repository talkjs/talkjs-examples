document.addEventListener("DOMContentLoaded", () => {
  const users = gon.users;
  const mainUser = gon.mainUser;
  
  const pathSegments = window.location.pathname.split("/");
  const name = pathSegments[pathSegments.length - 1];
  const otherUser = users.find((user) => user.id === name);

  Talk.ready.then(function () {
    const me = new Talk.User({
      id: mainUser.id,
      name: mainUser.name,
      email: mainUser.email,
      photoUrl: mainUser.photoUrl,
      role: mainUser.role,
    });

    const other = new Talk.User({
      id: otherUser.id,
      name: otherUser.name,
      email: otherUser.email,
      photoUrl: otherUser.photoUrl,
      role: otherUser.role,
    });

    window.talkSession = new Talk.Session({
      appId: "<APP_ID>",
      me: me,
    });

    const conversation = talkSession.getOrCreateConversation(
      Talk.oneOnOneId(me, other)
    );
    conversation.setParticipant(me);
    conversation.setParticipant(other);

    let chatbox = talkSession.createChatbox();
    chatbox.mount(document.getElementById("talkjs-container"));
    chatbox.select(conversation);
  });
});
