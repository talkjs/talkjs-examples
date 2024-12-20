const getUser = async (id) => {
  const response = await fetch(`http://127.0.0.1:3000/getUser/${id}`);
  const data = await response.json();
  let user = new Talk.User({
    id: data.id,
    name: data.name,
    photoUrl: data.photoUrl,
    email: data.email,
    role: data.role,
  });
  return user;
};

(async function () {
  await Talk.ready;
  let agent = await getUser(1);
  let user = await getUser(2);
  const session = new Talk.Session({
    appId: "<APP_ID>", // replace with your app ID
    me: user,
  });
  var conversation = session.getOrCreateConversation(
    "nodeJSExampleConversation"
  );
  conversation.setAttributes({
    welcomeMessages: [
      "Example chat for our Node.js tutorial. Try sending a message!",
    ],
  });
  conversation.setParticipant(user);
  conversation.setParticipant(agent);

  var chatbox = session.createChatbox(conversation);
  chatbox.select(conversation);
  chatbox.mount(document.getElementById("talkjs-container"));
})();
