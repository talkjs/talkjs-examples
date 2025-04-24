<script>
  import { appId, abby, oliver } from "./talkJsConfig";
  import { onMount } from "svelte";
  import Talk from "talkjs";

  let element;

  onMount(async () => {
    Talk.ready.then(() => {
      const session = new Talk.Session({
        appId: appId,
        userId: oliver.id,
      });
      session.currentUser.createIfNotExists(oliver);

      const otherRef = session.user(abby.id);
      otherRef.createIfNotExists(abby);

      const conversationRef = session.conversation('svelte_example_conversation');
      conversationRef.createIfNotExists();
      conversationRef.participant(otherRef).createIfNotExists();

      const chatbox = session.createChatbox();
      chatbox.select(conversationRef);
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
