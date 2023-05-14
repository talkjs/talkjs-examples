const APP_ID = "YOUR_APP_ID";
const TALKJS_URL = "https://api.talkjs.com/v1/";
(async function () {
  await Talk.ready;
  let me = new Talk.User({
    id: "123456",
    name: "Alice",
    email: "alice@example.com",
    photoUrl: "https://talkjs.com/images/avatar-1.jpg",
    role: "user",
  });
  window.talkSession = new Talk.Session({
    appId: APP_ID,
    me: me,
  });
  let other = new Talk.User({
    role: "admin",
    id: "654321",
    name: "Shopping Assistant",
    email: "shopping_bot@example.com",
    photoUrl: "https://talkjs.com/images/avatar-3.jpg",
    welcomeMessage:
      "Hey, I'm your shopping assistant! Enter the name of your favorite sneaker brand or series.",
  });

  let conversation = talkSession.getOrCreateConversation(
    Talk.oneOnOneId(me, other)
  );
  conversation.setParticipant(me);
  conversation.setParticipant(other);

  let chatbox = talkSession.createChatbox();
  chatbox.select(conversation);
  chatbox.mount(document.getElementById("talkjs-container"));

  let htmlPanel = await chatbox.createHtmlPanel({
    url: "./product-recommendations.html",
    height: 285,
    show: false,
  });

  chatbox.onSendMessage(function (data) {
    let messageText = data.message.text;
    let conversationId = data.conversation.id;
    console.log(conversationId);
    getProducts(conversationId, messageText, htmlPanel);
  });
})();

//Function to post a success reply to the chat
async function postSuccessReply(conversationId) {
  const data = [
    {
      text: "Awesome. Here are our top recommendations! If you want to view other products, simply type the name of the product you want.",
      sender: "654321",
      type: "UserMessage",
    },
  ];
  const talkJSURL = `${TALKJS_URL}${APP_ID}/conversations/${conversationId}/messages`;
  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer YOUR_SECRET_KEY",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(talkJSURL, options);
  } catch (error) {
    console.log(error);
  }
}

//Function to get products from Sneaks API
async function getProducts(conversationId, messageText, htmlPanel) {
  if (htmlPanel.window.document.getElementById("row").hasChildNodes()) {
    htmlPanel.window.document.getElementById("row").innerHTML = "";
  }

  const product_url = `http://localhost:4000/search/${messageText}?count=10`;
  const product_url_options = {
    method: "GET",
  };

  try {
    const response = await fetch(product_url, product_url_options);
    const result = await response.json();
    const productData = result.slice(0, 10);

    const row = htmlPanel.window.document.getElementById("row");

    await htmlPanel.DOMContentLoadedPromise;
    await htmlPanel.windowLoadedPromise;
    
    postSuccessReply(conversationId);
    productData.forEach((product) => {
      let cardDiv = htmlPanel.window.document.createElement("div");
      cardDiv.classList.add("card");

      let brandName = htmlPanel.window.document.createElement("span");
      brandName.classList.add("brand-name");
      brandName.innerHTML = product.brand;

      let cardImageLink = htmlPanel.window.document.createElement("a");
      cardImageLink.href = product.resellLinks["stockX"];
      cardImageLink.target = "_blank";
      cardImageLink.innerHTML = product.shoeName;

      let cardImage = htmlPanel.window.document.createElement("img");
      cardImage.addEventListener("error", () => {
        console.log(cardImage.src);
        cardImage.src = "./static/no_image.png";
      });
      cardImage.src = product.thumbnail;
      cardImage.classList.add("card-image");

      let retailPrice = htmlPanel.window.document.createElement("span");
      retailPrice.classList.add("price");
      retailPrice.innerHTML = "Price: " + product.lowestResellPrice["stockX"];

      cardDiv.appendChild(cardImage);
      cardDiv.appendChild(brandName);
      cardDiv.appendChild(retailPrice);
      cardDiv.appendChild(cardImageLink);
      row.appendChild(cardDiv);
    });

    const closeButton =
      htmlPanel.window.document.getElementById("close-button");
    closeButton.addEventListener("click", () => {
      htmlPanel.hide();
    });
    htmlPanel.show();
  } catch (error) {
    console.log(error);
  }
}
