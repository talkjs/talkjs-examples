<script>
  import Talk from 'talkjs';
  import { onMount } from 'svelte';
  import { appId, abby, oliver } from "$lib/talkJsConfig";

  onMount(async () => {
    await Talk.ready;
    // Safe to use the SDK here
    const me = new Talk.User(oliver);
    const other = new Talk.User(abby);

    const session = new Talk.Session({ appId, me });

    const conversation = session.getOrCreateConversation(
        'new_conversation'
      );
      conversation.setParticipant(me);
      conversation.setParticipant(other);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(document.getElementById('talkjs-container'));
    });
</script>

<div id="talkjs-container" style="height: 600px">Loading chats..</div>

<style>
</style>
