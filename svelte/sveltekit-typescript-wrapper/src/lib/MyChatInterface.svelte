<script lang="ts">
  import Talk from "talkjs";
  import { abby, rebecca, george } from "$lib/talkJsConfig";

  export let session: Talk.Session;
  $: currentUser = session.me;

  let otherUserOptions: Talk.UserOptions = abby;
  $: otherUser = new Talk.User(otherUserOptions)

  let conversation: Talk.ConversationBuilder;
  $: {
    conversation = session.getOrCreateConversation(Talk.oneOnOneId(currentUser, otherUser));
    conversation.setParticipant(currentUser);
    conversation.setParticipant(otherUser);
  }

  let element: HTMLDivElement | undefined;
  $: chatbox = session.createChatbox();
  $: chatbox.select(conversation);
  $: if (element) chatbox.mount(element);
</script>

<style>
  .container {
    display: grid;
    grid-template-rows: auto 1fr;

    padding: 2em;
    gap: 1em;

    height: 100%;
    box-sizing: border-box;
  }
  select {
    margin: auto;
  }
</style>

<div class="container">
  <select bind:value={otherUserOptions}>
    {#each [abby, rebecca, george] as user}
      <option value={user}>{user.name}</option>
    {/each}
  </select>
  
  <div bind:this={element}/>
</div>
