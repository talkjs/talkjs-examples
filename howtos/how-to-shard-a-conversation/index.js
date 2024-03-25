let talkSession;
const appId = "<YOUR_APP_ID>";
const userEntryFormModal = new bootstrap.Modal(document.getElementById('userEntryFormModal'), {})
const talkJSContainer = document.getElementById("talkjs-container");

if(sessionStorage.getItem("showModal") == "false")
  setMainConversation();
else{
  userEntryFormModal.show();
  talkJSContainer.style.display = "none";
}

document.getElementById("myForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.querySelector('.userName').value;
  const email = document.querySelector('.userEmailAddress').value;
  const profilePictureURL = document.querySelector('.userProfilePicture').value;
  const user = await createUser(name, email, profilePictureURL);
  const conversation = await getRandomConversation();  
  await assignUserToConversation(user, conversation);
  sessionStorage.setItem("currentUser", user.id);
  sessionStorage.setItem("currentConversation", conversation.id);
  sessionStorage.setItem("showModal", "false");
  userEntryFormModal.hide();  
});

async function setMainConversation(){
  await Talk.ready;
  const user = new Talk.User(sessionStorage.getItem("currentUser"));
  talkSession = window.talkSession = new Talk.Session({
    appId: appId,
    me: user
  });
  const inbox = talkSession.createInbox();
  const currentConversation = await talkSession.getOrCreateConversation(sessionStorage.getItem("currentConversation"));
  inbox.select(currentConversation);
  inbox.mount(talkJSContainer);
}

async function getRandomConversation(){
  let conversationArray = [];
  let conversation1, conversation2, conversation3;
  conversation1 = await talkSession.getOrCreateConversation("sharded-conversation-1");
  conversation2 = await talkSession.getOrCreateConversation("sharded-conversation-2");
  conversation3 = await talkSession.getOrCreateConversation("sharded-conversation-3");
  conversationArray.push(conversation1, conversation2, conversation3);
  const randomIndex = Math.floor(Math.random() * conversationArray.length);
  return conversationArray[randomIndex];
}

async function assignUserToConversation(user, conversation){
  await Talk.ready;
  conversation.setParticipant(user);
  const inbox = talkSession.createInbox();
  inbox.select(conversation);
  talkJSContainer.style.display = "block";
  inbox.mount(talkJSContainer);
}

async function createUser(name, email, profilePictureURL){
  await Talk.ready;
  const user = new Talk.User({
    id: crypto.randomUUID(),
    name: name,
    email: email,
    photoUrl: profilePictureURL,
    role: "default"
  });
  talkSession = window.talkSession = new Talk.Session({
    appId: appId,
    me: user,
  });
  return user;
}