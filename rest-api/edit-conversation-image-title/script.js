let conversationId = "";

const myModal = new bootstrap.Modal(
  document.getElementById("editModal"),
  {}
);

(async () => {
  await Talk.ready;
  const me = new Talk.User({
    id: "0001",
    name: "Kirsten Doe",
    email: "kirsten.doe@example.com",
    photoUrl: "https://talkjs.com/images/avatar-1.jpg",
    role: "default",
  });

  const other = new Talk.User({
    id: "0002",
    name: "Mikaela Ross",
    email: "mikaela.ross@example.com",
    photoUrl: "https://talkjs.com/images/avatar-7.jpg",
    role: "default",
  });

  const other2 = new Talk.User({
    id: "0003",
    name: "Ross Haydon",
    email: "ross.haydon@example.com",
    photoUrl: "https://talkjs.com/images/avatar-4.jpg",
    role: "default",
  });

  window.talkSession = new Talk.Session({
    appId: "YOUR_APP_ID",
    me: me,
  });

  const conversation = talkSession.getOrCreateConversation("GROUPCHAT001");
  conversation.setParticipant(me);
  conversation.setParticipant(other);
  conversation.setParticipant(other2);

  const chatbox = talkSession.createChatbox();
  chatbox.select(conversation);
  chatbox.mount(document.getElementById("talkjs-container"));

  chatbox.onCustomConversationAction("editTitleOrImage", (event) => {
    myModal.show();
    conversationId = event.conversation.id;
  });
})();

function getFormData(event) {
  event.preventDefault();
  const imageURL = document.getElementById("imageURL").value;
  const conversationTitle = document.getElementById("conversationTitle").value;
  editImageOrTitle(conversationId, imageURL, conversationTitle);
  myModal.hide();  
}

async function editImageOrTitle(conversationId, imageURL, conversationTitle) {
  const serverURL = `http://127.0.0.1:3000/editImageOrTitle`;
  const data = {
    conversationId: conversationId,
    conversationTitle: conversationTitle ? conversationTitle : undefined,
    imageURL: imageURL ? imageURL : undefined,
  };
  const response = await fetch(serverURL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((err) => console.log(err));
}
