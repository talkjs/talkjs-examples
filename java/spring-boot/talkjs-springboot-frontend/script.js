const getAgent = async () => {
  const response = await fetch("http://localhost:8080/getUser?userId=1");
  const data = await response.json();
  let agent = new Talk.User({
    id: data.id,
    name: data.name,
    photoUrl: data.dp,
    email: data.email,
    role: data.role,
  });
  return agent;
};
const getUser = async () => {
  const response = await fetch("http://localhost:8080/getUser?userId=2");
  const data = await response.json();
  let user = new Talk.User({
    id: data.id,
    name: data.name,
    photoUrl: data.dp,
    email: data.email,
    role: data.role,
  });
  return user;
};

(async function () {
  await Talk.ready;
  let agent = await getAgent();
  let user = await getUser();
  const session = new Talk.Session({
    appId: "<APP_ID>", // replace with your TalkJS app ID
    me: user,
  });
  var conversation = session.getOrCreateConversation(
    Talk.oneOnOneId(user, agent)
  );
  conversation.setAttributes({
    welcomeMessages: [
      "You can start typing your message here and one of our agents will be with you shortly.",
      "Please do not divulge any of your personal information.",
    ],
  });
  conversation.setParticipant(user);
  conversation.setParticipant(agent);

  var inbox = session.createInbox(conversation);
  inbox.select(conversation);
  inbox.mount(document.getElementById("talkjs-container"));
})();
