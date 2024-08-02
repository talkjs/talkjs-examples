const APP_ID = "YOUR_APP_ID";
const conversationObject = createTalkJSConversation();

async function createTalkJSConversation() {
  await Talk.ready;
  const me = new Talk.User({
    id: "00002",
    name: "Kirsten Doe",
    email: "kirsten.doe@example.com",
    photoUrl: "https://talkjs.com/images/avatar-1.jpg",
    role: "user",
  });

  window.talkSession = new Talk.Session({
    appId: APP_ID,
    me: me,
  });
  const other = new Talk.User({
    id: "00001",
    name: "Mikaela Ross",
    email: "mikaela.ross@example.com",
    photoUrl: "https://talkjs.com/images/avatar-7.jpg",
  });

  const conversation = talkSession.getOrCreateConversation(
    Talk.oneOnOneId(me, other)
  );

  conversation.setParticipant(me);
  conversation.setParticipant(other);
  const chatbox = talkSession.createChatbox();
  chatbox.select(conversation);
  chatbox.mount(document.getElementById("talkjs-container"));
  chatbox.onCustomConversationAction("goToZoom", () => createZoomMeeting());
  return conversation;
}

async function createZoomMeeting() {
  const conversation = await conversationObject;
  const serverURL = `http://127.0.0.1:3000/meeting`;
  try {
    const response = await fetch(serverURL, {
      method: "GET",
    });
    const data = await response.json();
    conversation.sendMessage("Please join the Zoom meeting " + data.join_url);
  } catch (error) {
    console.log(error);
  }
}
