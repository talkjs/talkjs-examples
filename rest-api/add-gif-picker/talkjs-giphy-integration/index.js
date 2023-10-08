import { GiphyFetch } from "@giphy/js-fetch-api";

const gf = new GiphyFetch("YOUR_GIPHY_API_KEY");

let conversationId = "";
let currentUser = {};

const gifSearchForm = document.querySelector("form");

gifSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = document.getElementById("searchTerm").value;
  search(searchTerm);
});

const search = async (searchTerm) => {
  const gifResults = document.getElementById("gifSearchResults");
  if(gifResults.innerHTML !== "") gifResults.innerHTML = "";
  const result = await gf
    .search(searchTerm, { sort: "popular", limit: 30 })
    .then((response) => {
      response.data.forEach((gif) => {
        const cardImage = window.document.createElement("img");
        cardImage.src = gif.images.fixed_width.url;
        cardImage.classList.add("gif-image");
        gifResults.appendChild(cardImage);
      });
    })
    .catch((err) => console.error(`search`, err));
};

gifSearchForm.addEventListener("click", (event) => {
  if (event.target.tagName !== "IMG") return;
  else {
    addGIFtoChat(conversationId, currentUser.id, event.target.src);
    const gifSearch = document.getElementById("gif-search");
    const gifResults = document.getElementById("gifSearchResults");
    gifResults.innerHTML = "";
    gifSearch.style.display = "none";
  }
});

async function addGIFtoChat(conversationId, senderId, imageURL) {
  const serverURL = `http://127.0.0.1:3000/addGIFtoChat`;
  const data = {
    conversationId: conversationId,
    senderId: senderId,
    imageURL: imageURL ? imageURL : undefined,
  };
  const response = await fetch(serverURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((err) => console.log(err));
}

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
  window.talkSession = new Talk.Session({
    appId: "YOUR_APP_ID",
    me: other,
  });

  const conversation = talkSession.getOrCreateConversation(
    Talk.oneOnOneId(me, other)
  );
  conversation.setParticipant(me);
  conversation.setParticipant(other);

  const chatbox = talkSession.createChatbox();
  chatbox.select(conversation);
  chatbox.mount(document.getElementById("talkjs-container"));

  conversationId = conversation.id;
  currentUser = me;

  chatbox.onCustomConversationAction("pickGIF", (event) => {
    const gifSearch = document.getElementById("gif-search");
    if (gifSearch.style.display === "block") {
      gifSearch.style.display = "none";
      const gifResults = document.getElementById("gifSearchResults");
      gifResults.innerHTML = "";
    } else {
      gifSearch.style.display = "block";
    }
  });
})();
