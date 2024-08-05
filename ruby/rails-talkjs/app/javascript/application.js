// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";

const users = gon.users;
Talk.ready.then(function () {
  const me = new Talk.User({
    id: users[0].id,
    name: users[0].name,
    email: users[0].email,
    photoUrl: users[0].photoUrl,
    role: users[0].role,
  });

  const other = new Talk.User({
    id: users[1].id,
    name: users[1].name,
    email: users[1].email,
    photoUrl: users[1].photoUrl,
    role: users[1].role,
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
