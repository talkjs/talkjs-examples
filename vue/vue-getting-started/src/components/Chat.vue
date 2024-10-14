//Chat.vue

<template>
  <div id="talkjs-container" style="width: 100%; height: 500px">
      <i>Loading chat...</i>
  </div>
</template>

<script setup>
  import Talk from "talkjs";
  import { onMounted } from 'vue';

  onMounted(() => {
    Talk.ready.then(() => {
      const me = new Talk.User({
        id: 'nina',
        name: 'Nina',
        email: 'nina@example.com',
        photoUrl: 'https://talkjs.com/new-web/avatar-7.jpg',
        welcomeMessage: 'Hi!',
      });
      const session = new Talk.Session({
        appId: '<APP_ID>',
        me: me,
      });

      const other = new Talk.User({
        id: 'frank',
        name: 'Frank',
        email: 'frank@example.com',
        photoUrl: 'https://talkjs.com/new-web/avatar-8.jpg',
        welcomeMessage: 'Hey, how can I help?',
      });

      const conversation = session.getOrCreateConversation('new_conversation');
      conversation.setParticipant(me);
      conversation.setParticipant(other);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(document.getElementById('talkjs-container'));
      });
  });
</script>
