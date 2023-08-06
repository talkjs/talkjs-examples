(async() => {
  await Talk.ready;
  const me = new Talk.User({
    id: "00004",
    name: "Kirsten Doe",
    email: "kirsten.doe@example.com",
    photoUrl: "https://talkjs.com/images/avatar-1.jpg",
    role: "default",
  });

  const other = new Talk.User({
    id: "00003",
    name: "Mikaela Ross",
    email: "mikaela.ross@example.com",
    photoUrl: "https://talkjs.com/images/avatar-7.jpg",
    role: "default",
  });

  const other2 = new Talk.User({
    id: "00099",
    name: "Ross Haydon",
    email: "ross.haydon@example.com",
    photoUrl: "https://talkjs.com/images/avatar-4.jpg",
    role: "default",
  });

  window.talkSession = new Talk.Session({
    appId: "YOUR_APP_ID",
    me: me,
  });

  const conversation = talkSession.getOrCreateConversation("GROUPCHAT0001");
  conversation.setParticipant(me);
  conversation.setParticipant(other);
  conversation.setParticipant(other2);

  const chatbox = talkSession.createChatbox();
  chatbox.select(conversation);
  chatbox.mount(document.getElementById("talkjs-container"));

  chatbox.onCustomConversationAction("editTitleOrImage", (event) => {

    const modal = document.getElementsByClassName("modal")[0];
    const span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";
    
    span.onclick = () => {
      modal.style.display = "none";
    }
    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    const btn = document.getElementsByClassName("submitData")[0];
    btn.onclick = () => {
      const imageURL = document.getElementsByClassName("imageURL")[0].value;
      const title = document.getElementsByClassName("conversationTitle")[0].value;        
      editImageOrTitle(event.conversation.id, imageURL, title);
      modal.style.display = "none";
    }
  });
})();

async function editImageOrTitle(conversationId, imageURL, title) {
  const serverURL = `http://127.0.0.1:3000/editImageOrTitle`;  
  const data = {
      conversationId: conversationId,
      conversationTitle: title ? title : "",
      imageURL: imageURL ? imageURL : ""
  }
  try {
    const response = await fetch(serverURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
}   