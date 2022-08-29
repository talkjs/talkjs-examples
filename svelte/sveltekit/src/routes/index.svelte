<script>
  import { appId, abby, oliver } from "$lib/talkJsConfig";
  import { onMount } from "svelte";
  import Talk from "talkjs";

  let element;

  onMount(async () => {
    Talk.ready.then(() => {
      const me = new Talk.User(oliver);
      const other = new Talk.User(abby);

      const session = new Talk.Session({ appId, me });

      const conversationId = Talk.oneOnOneId(me, other);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(me);
      conversation.setParticipant(other);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(element);
    });
  });
</script>

<div class="container">
  <div bind:this={element} />
</div>

<style>
  .container {
    display: grid;

    padding: 2em;
    gap: 1em;

    height: 100%;
    box-sizing: border-box;
  }
</style>
