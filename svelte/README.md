# TalkJS Svelte Examples

There are 3 examples available:

- **[/svelte](/svelte)** is a basic hello-world-style example using Svelte
- **[/sveltekit](/sveltekit)** is the same as `svelte`, but uses [SvelteKit](https://kit.svelte.dev/) instead
- **[/sveltekit-typescript-wrapper](/sveltekit-typescript-wrapper)** is a more advanced example, showing how you can use TalkJS in an idiomatically-svelte way. Other than using TypeScript, the main difference is that it adds a [`TalkJs.svelte`](/sveltekit-typescript-wrapper/src/lib/TalkJs.svelte) wrapper component. This component waits for TalkJS to load before rendering its child components, so you don't have to use `await Talk.ready` and `onMount` everywhere. Instead, you can just write normal Svelte code, including reactive statements.
