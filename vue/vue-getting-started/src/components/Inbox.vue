//Inbox.vue

<template>
  <div ref="talkjs" style="width: 1000px; margin: 30px; height: 500px">
    <i>Loading chat...</i>
  </div>
</template>

<script>
import Talk from "talkjs";
export default {
  name: "Inbox",
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
  },
  async mounted() {
    await Talk.ready;
    const me = new Talk.User({
      id: this.currentUser.id,
      name: this.currentUser.name,
      email: this.currentUser.email,
      photoUrl: this.currentUser.photoUrl,
      welcomeMessage: "Hey there! How are you? :-)",
      role: "booker",
    });

    const talkSession = new Talk.Session({
      appId: "<APP_ID>",
      me: me,
    });

    const other = new Talk.User({
      id: "654321",
      name: "Sebastian",
      email: "Sebastian@example.com",
      photoUrl: "https://demo.talkjs.com/img/sebastian.jpg",
      welcomeMessage: "Hey, how can I help?",
    });

    const conversation = talkSession.getOrCreateConversation(
      Talk.oneOnOneId(me, other)
    );

    conversation.setParticipant(me);
    conversation.setParticipant(other);

    const inbox = talkSession.createInbox();
    inbox.select(conversation);

    inbox.mount(this.$refs.talkjs);
  },
};
</script>
