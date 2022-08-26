<script lang="ts">
  import { onMount } from "svelte";
  import Talk from "talkjs"
  import { appId } from "./TalkJsConfig";

  export let currentUser: Talk.UserOptions;
  let session: Talk.Session;

  onMount(async () => {
    // We use `onMount` rather than just `{#await}` to prevent it running during pre-rendering
    // because TalkJS will error out if you try to pre-render it
    await Talk.ready;

    const me = new Talk.User(currentUser);
    session = new Talk.Session({ appId, me });
  })
</script>

{#if session === undefined}
  <p>Loading...</p>
{:else}
  <slot {session} />
{/if}
