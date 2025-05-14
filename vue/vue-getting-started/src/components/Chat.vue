//Chat.vue

<template>
  <div id="talkjs-container" style="width: 100%; height: 500px">
    <i>Loading chat...</i>
  </div>
</template>

<script setup>
import Talk from "talkjs";
import { onMounted } from "vue";

onMounted(() => {
  Talk.ready.then(() => {
    const session = new Talk.Session({
      appId: "<APP_ID>",
      userId: "nina",
    });
    session.currentUser.createIfNotExists({
      name: "Nina",
      email: "nina@example.com",
      photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
      welcomeMessage: "Hi!",
    });

    const otherRef = session.user("frank");
    otherRef.createIfNotExists({
      name: "Frank",
      email: "frank@example.com",
      photoUrl: "https://talkjs.com/new-web/avatar-8.jpg",
      welcomeMessage: "Hey, how can I help?",
    });

    const conversationRef = session.conversation("new_conversation");
    conversationRef.createIfNotExists();
    conversationRef.participant(otherRef).createIfNotExists();

    const chatbox = session.createChatbox();
    chatbox.select(conversationRef);
    chatbox.mount(document.getElementById("talkjs-container"));
  });
});
</script>
