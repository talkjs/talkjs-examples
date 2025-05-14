<script>
  import Talk from 'talkjs';
  import { onMount } from 'svelte';
  import { appId, abby, oliver } from "$lib/talkJsConfig";

  onMount(async () => {
    await Talk.ready;
    const session = new Talk.Session({
        appId: appId,
        userId: oliver.id,
      });
      session.currentUser.createIfNotExists(oliver);

      const otherRef = session.user(abby.id);
      otherRef.createIfNotExists(abby);

      const conversationRef = session.conversation('sveltekit_example_conversation');
      conversationRef.createIfNotExists();
      conversationRef.participant(otherRef).createIfNotExists();

      const chatbox = session.createChatbox();
      chatbox.select(conversationRef);
      chatbox.mount(document.getElementById('talkjs-container'));
    });
</script>

<div id="talkjs-container" style="height: 600px">Loading chats..</div>

<style>
</style>
