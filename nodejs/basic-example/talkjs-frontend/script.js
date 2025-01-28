const getUser = async (id) => {
  const response = await fetch(`http://127.0.0.1:3000/getUser/${id}`);
  const data = await response.json();
  let user = new Talk.User({
    id: data.id,
    name: data.name,
    photoUrl: data.photoUrl,
    email: data.email,
    role: data.role,
    welcomeMessage: data.welcomeMessage,
  });
  return user;
};

(async function () {
  await Talk.ready;
  const alice = await getUser("alice");
  const sebastian = await getUser("sebastian");
  const session = new Talk.Session({
    appId: "<APP_ID>", // replace with your app ID
    me: sebastian,
  });
  const conversation = session.getOrCreateConversation(
    "nodeJSExampleConversation"
  );
  conversation.setAttributes({
    welcomeMessages: [
      "Example chat for our Node.js tutorial. Try sending a message!",
    ],
  });
  conversation.setParticipant(alice);
  conversation.setParticipant(sebastian);

  const chatbox = session.createChatbox(conversation);
  chatbox.select(conversation);
  chatbox.mount(document.getElementById("talkjs-container"));
})();
