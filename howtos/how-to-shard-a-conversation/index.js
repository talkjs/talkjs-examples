const appId = "<YOUR_APP_ID>";

const userEntryFormModal = new bootstrap.Modal(
  document.getElementById("userEntryFormModal"),
  {}
);
const talkJSContainer = document.getElementById("talkjs-container");

const savedUserId = sessionStorage.getItem("currentUser");
if (savedUserId) {
  Talk.ready.then(() => {
    const user = new Talk.User(savedUserId);
    showChat(user);
  });
} else {
  userEntryFormModal.show();
  talkJSContainer.style.display = "none";
}

async function modalSubmitted(event) {
  event.preventDefault();

  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmailAddress").value;
  const profilePictureURL = document.getElementById("userProfilePicture").value;
  await Talk.ready;
  const user = createUser(name, email, profilePictureURL);
  await showChat(user);
}

function createUser(name, email, profilePictureURL) {
  const userId = crypto.randomUUID();
  sessionStorage.setItem("currentUser", userId);
  return new Talk.User({
    id: userId,
    name: name,
    email: email,
    photoUrl: profilePictureURL,
    role: "default",
  });
}

async function showChat(user) {
  console.log("show chat");
  const session = new Talk.Session({ appId, me: user });

  const shard = getShard(user.id);
  const conversation = session.getOrCreateConversation(
    `sharded-conversation-${shard}`
  );
  conversation.setParticipant(user);

  const chatbox = session.createChatbox();
  chatbox.select(conversation);
  await chatbox.mount(talkJSContainer);

  talkJSContainer.style.display = "block";
  userEntryFormModal.hide();
}

/**
 * Returns the shard id for a given user id
 * When re-ran with the same user id, this will always return the same conversation id
 * So the sharding is stable
 */
function getShard(userId) {
  const shardCount = 3;

  // UUID is like 88710ed2-4121-4c60-90c5-506be6bcd664, take just the last section, 506be6bcd664
  const lastIdSection = userId.substring(userId.lastIndexOf("-") + 1);

  // Convert that from hexadecimal to decimal number, 88424362858084
  const lastIdNumeric = parseInt(lastIdSection, 16);

  // Assign to one of N shards using modulo, in this case 88424362858084 % 3 = 1
  return (lastIdNumeric % shardCount) + 1;
}
