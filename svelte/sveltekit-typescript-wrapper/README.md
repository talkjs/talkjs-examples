# TalkJS SvelteKit + TS + Wrapper Example

This example shows how to integrate TalkJS with SvelteKit (using TypeScript), with a wrapper component - `<TalkJS>`.

The wrapper component contains a single slot for child components, and makes sure that TalkJS is fully loaded before rendering the children. That means you can use the `Talk` API without having to worry about `await Talk.ready`.

For example:

```svelte
<TalkJs currentUser={oliver} let:session>
  <MyChatInterface {session} />
</TalkJs>
```

Inside the `MyChatInterface` component, you can assume that TalkJS is loaded and ready, meaning you don't have to put anything in `onMount`.

Open `/src/lib/talkJsConfig.ts` and replace `YOUR_APP_ID` with your own appId which you can find in the [TalkJS Dashboard](https://talkjs.com/dashboard)

Run `npm install && npm run dev` to start the example on port 5000.
