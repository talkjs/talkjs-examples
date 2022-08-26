<script>
  import { abby, appId, george, oliver, rebecca } from "$lib/TalkJsConfig";
  import { onMount } from "svelte";
  import Talk from "talkjs";

  let session;

  onMount(async () => {
    await Talk.ready;
    const currentUser = new Talk.User(oliver);
    session = new Talk.Session({ appId, me: currentUser });
  })

  let otherUserOptions = abby;
  $: otherUser = session ? new Talk.User(otherUserOptions) : undefined;

  let conversation;
  $: if (session && otherUser) {
    const currentUser = session.me;
    conversation = session.getOrCreateConversation(Talk.oneOnOneId(currentUser, otherUser));
    conversation.setParticipant(currentUser);
    conversation.setParticipant(otherUser);
  }

  let element;
  $: chatbox = session?.createChatbox();
  $: chatbox?.select(conversation);
  $: chatbox?.mount(element);
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
