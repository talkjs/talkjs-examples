<template>
  <div class="talkjs-container"></div>
</template>

<script>
import Talk from "talkjs";
export default {
  name: "HtmlPanel",
    data: () => ({
      popup: ''
  }),
 
  mounted: function () {
    Talk.ready.then(async function () {
      const me = new Talk.User({
        id: parseInt(Math.random() * 500000).toString(),
        name: "Alice",
        email: "demo@talkjs.com",
        welcomeMessage: "Hey there! How are you? :-)",
        role: "default",
      });

      const session = new Talk.Session({
        appId: "YOUR_APP_ID",
        me: me,
      });

      const other = new Talk.User({
        id: parseInt(Math.random() * 500000).toString(),
        name: "Sebastian",
        email: "demo@talkjs.com",
        welcomeMessage: "Hey, how can I help?",
        role: "default",
      });

      const conversation = session.getOrCreateConversation(
        Talk.oneOnOneId(me, other)
      );
      conversation.setParticipant(me);
      conversation.setParticipant(other);
      const popup = session.createPopup(conversation, {
        keepOpen: true,
      });

      await popup.mount({show: true});
      const htmlPanel = await popup.createHtmlPanel({
        url: "./static/get-notified.html",
        height: 110,
        show: true,
      })
      const button = htmlPanel.window.document.getElementById("submit")

      button.addEventListener("click", () => {
        // handle form submission

        alert("submission successful");
        htmlPanel.hide();
      });
    });
  }
};
</script>

<style scoped>
</style>
