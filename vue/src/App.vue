<script setup>
import Chat from "./components/Chat.vue";

const me = {
  id: "sample_user_alice",
  name: "Alice",
  email: "nina@example.com",
  photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
  welcomeMessage: "Hi!",
};
</script>

<template>
  <header></header>

  <main>
    <Chat :currentUser="me" />
  </main>
</template>
