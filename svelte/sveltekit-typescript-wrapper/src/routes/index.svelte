<script lang="ts">
  import TalkJs from "$lib/TalkJs.svelte";
  import MyChatInterface from "$lib/MyChatInterface.svelte";
  import { oliver } from "$lib/TalkJsConfig";
</script>

<TalkJs currentUser={oliver} let:session>
  <MyChatInterface {session} />
</TalkJs>
