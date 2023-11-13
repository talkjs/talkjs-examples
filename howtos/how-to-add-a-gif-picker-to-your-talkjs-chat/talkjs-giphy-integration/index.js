import { GiphyFetch } from "@giphy/js-fetch-api";
const giphy = new GiphyFetch("<YOUR_GIPHY_API_KEY>");

let timer = null;
function debounce(callback) {
  if (timer !== null) {
    clearTimeout(timer);
  }

  timer = setTimeout(() => {
    callback();
    timer = null;
  }, 500);
}

let conversation;

const gifOverlay = document.getElementById("gif-overlay");
const gifSearchInput = document.getElementById("gif-search-input");
const gifResults = document.getElementById("gif-search-results");
const closeButton = document.getElementById("close-button");

let showingOverlay = false;
function showOverlay() {
  if (showingOverlay) {
    return;
  }

  showingOverlay = true;
  gifOverlay.classList.remove("hidden");
  gifSearchInput.focus();
}

function hideOverlay() {
  if (!showingOverlay) {
    return;
  }

  showingOverlay = false;
  gifOverlay.classList.add("hidden");
  gifSearchInput.blur();
  updateResults([]);
  gifSearchInput.value = "";
}

function toggleOverlay() {
  if (showingOverlay) {
    hideOverlay();
  } else {
    showOverlay();
  }
}

gifSearchInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideOverlay();
  }
});

closeButton.addEventListener("click", (event) => {
  event.preventDefault();
  hideOverlay();
});

function updateResults(gifs) {
  const newGifElements = gifs.map((gif) => {
    const cardImage = window.document.createElement("img");
    cardImage.src = gif.images.fixed_width.url;
    cardImage.addEventListener("click", () => {
      conversation.sendMessage(gif.images.original.mp4, {
        custom: { gifAttachment: "true" },
      });
      hideOverlay();
    });
    return cardImage;
  });
  gifResults.replaceChildren(...newGifElements);
}

gifSearchInput.addEventListener("input", async () => {
  if (!showingOverlay) {
    return;
  }

  debounce(async () => {
    const response = await giphy.search(gifSearchInput.value, {
      sort: "popular",
      limit: 30,
    });
    updateResults(response.data);
  });
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

  chatbox.onCustomConversationAction("pickGIF", () => toggleOverlay());

  chatbox.select(conversation);
  chatbox.mount(document.getElementById("talkjs-container"));
});
