<script setup>
import Inbox from "./components/Inbox.vue";

const me = {
  id: "sample_user_alice",
  name: "Alice",
  email: "nina@example.com",
  photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
  welcomeMessage: "Hi!",
};
</script>

<template>
  <main>
    <Inbox :currentUser="me" />
  </main>
</template>
