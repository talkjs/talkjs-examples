# Transfer TalkJS data between apps

This example shows how you can copy users, conversations, and messages from one TalkJS app to another using the REST API.

It is useful when you want to move data between environments (for example from a test app to another test app), or between TalkJS apps you control.

> [!TIP]
> [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/rest-api.transfer-data.zip)

## Usage

1. Open `transferData.js` and set the origin and destination credentials from the [TalkJS Dashboard](https://talkjs.com/dashboard/):

```js
const originApp = {
    id: "ORIGIN_APP_ID",
    secretKey: "sk_test...",
};

const destinationApp = {
    id: "DESTINATION_APP_ID",
    secretKey: "sk_test...",
};

// Optional: also copy emoji reactions after messages are imported
const includeReactions = false;
```

2. Install dependencies and run the script:

```bash
npm i && node transferData.js
```

The script:

1. Exports all users, conversations, and messages from the origin app
2. Imports users into the destination app
3. Imports conversations (including participant access and notification settings), noting which ones already existed
4. Imports messages only into conversations that did not already exist on the destination (message import is not idempotent)
5. Optionally re-adds emoji reactions (`includeReactions`)
6. Restores each participant's `readUntil` value for newly imported conversations
7. Prints progress as it goes

Try the transfer against a test destination app first. If something goes wrong, you can use **Reset all data** on the Settings page of the TalkJS dashboard to clear the destination app and try again.

## Limitations

This is intentionally a simple, one-shot transfer script. Keep the following in mind:

- **Point-in-time copy.** The script exports data once at the start of each stage. Users, conversations, or messages created or changed in the origin app after that export are not transferred.
- **No live sync.** The destination app is not kept in sync after the script finishes. New activity in the origin app must be transferred again separately (or handled by your own ongoing sync process).
- **Message import is skipped for existing conversations.** Users and conversations are upserted, so re-running updates those. Before creating/updating each conversation, the script checks whether it already exists on the destination; if it does, messages (and reactions) for that conversation are skipped. This avoids duplicating messages on re-runs, but also means new origin messages are not added to conversations that already exist on the destination.
- **Attachment re-upload.** File attachments are downloaded from the origin and uploaded again to the destination. If a download or upload fails, that attachment is skipped and the script continues. The same origin file URL is only uploaded once.
- **Message IDs change.** TalkJS assigns new message IDs on import, so reply references (`referencedMessageId`) are not preserved.
- **Reactions are opt-in.** The import API does not support reactions, so when `includeReactions` is `true` the script re-adds them afterward with the normal reactions endpoints. This is slower, reaction timestamps are not preserved (they become "now"), and only the first 100 reactors per emoji on a message are transferred.
- **Push tokens are not transferred.** Device push tokens stay on the origin app.
- **No deletion sync.** Users, conversations, or messages deleted in the origin app are not deleted from the destination app.
- **Active clients.** Imported messages are not pushed to clients that already have a conversation open. Users may need to reload before they see imported history.

## Related

- [Export TalkJS data](../export-data/) — export users, conversations, and messages to JSON files
- [Import messages](https://talkjs.com/docs/REST_API/Import_Messages/) — TalkJS REST API docs for importing historical messages
