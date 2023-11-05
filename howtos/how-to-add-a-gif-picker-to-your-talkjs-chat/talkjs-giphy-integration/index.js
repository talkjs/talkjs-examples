import { GiphyFetch } from "@giphy/js-fetch-api";

const gf = new GiphyFetch("<YOUR_GIPHY_API_KEY>");

let conversation;

const gifSearchForm = document.querySelector("form");

gifSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  (async () => {
    const searchTerm = document.getElementById("searchTerm").value;
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
  })();  
});


gifSearchForm.addEventListener("click", (event) => {
  if (event.target.tagName !== "IMG") return;
  else {
    conversation.sendMessage(event.target.src, { custom: { gifAttachment: "true" }})
    const gifSearch = document.getElementById("gif-search");
    const gifResults = document.getElementById("gifSearchResults");
    gifResults.innerHTML = "";
    gifSearch.style.display = "none";
  }
});

Talk.ready.then(() => {
  const me = new Talk.User({
    id: "0004",
    name: "Kirsten Doe",
    email: "kirsten.doe@example.com",
    photoUrl: "https://talkjs.com/images/avatar-1.jpg",
    role: "default",
  });

  const other = new Talk.User({
    id: "0005",
    name: "Mikaela Ross",
    email: "mikaela.ross@example.com",
    photoUrl: "https://talkjs.com/images/avatar-7.jpg",
    role: "default",
  });
  window.talkSession = new Talk.Session({
    appId: "<YOUR_APP_ID>",
    me: me,
  });

  conversation = talkSession.getOrCreateConversation(
    Talk.oneOnOneId(me, other)
  );

  conversation.setParticipant(me);
  conversation.setParticipant(other);

  const chatbox = talkSession.createChatbox();

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

  chatbox.select(conversation);
  chatbox.mount(document.getElementById("talkjs-container"));
});
