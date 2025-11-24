# How to migrate from Sendbird to TalkJS example

This example project provides a script that imports Sendbird data into TalkJS. For more details on how to export your data from Sendbird, see the accompanying tutorial, [How to migrate from Sendbird to TalkJS](https://talkjs.com/resources/how-to-migrate-data-from-sendbird-to-talkjs/).

You can test the import script with the example data provided, or run it on your own data that you export from Sendbird.

> [!TIP] > [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/rest-api.migrate-data-from-sendbird-to-talkjs.zip)

## Prerequisites

To run this example project, you need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

## How to run the example

1. Clone or [download this project](https://github.com/talkjs/talkjs-examples/releases/latest/download/rest-api.migrate-data-from-sendbird-to-talkjs.zip).
2. In `config.js`, update `<APP_ID>` and `<SECRET_KEY>` with your TalkJS app ID and API secret key, which you can find on the Settings tab of the [dashboard](https://talkjs.com/dashboard). Use your [test environment](https://talkjs.com/docs/Features/Environments/) credentials to test your import, and only import to your live environment when you're happy with the results.
3. Run `npm install` in the top-level directory of the project to install dependencies.

To test the import script on the sample data for the tutorial:

1. Copy the files in `example-data` into the corresponding directories in `sendbird-data`.
2. Run `npm start` to run the import.
3. Test the import:
   1. In `script.js`, fill in `<APP_ID>` with your TalkJS app ID.
   2. Open `index.html` to view a TalkJS chatbox with the imported data

To run the import script on your own exported Sendbird data:

1. Export your Sendbird user, channel and message data, following the instructions in the [tutorial](https://talkjs.com/resources/how-to-migrate-data-from-sendbird-to-talkjs/), and add the files to the `users`, `channels` and `messages` directories in `sendbird-data`.
2. Run `npm start` to run the import.
3. Test the import. You could check that the users, conversations and messages have been added with the [REST API](https://talkjs.com/docs/REST_API/), view them in the **Activity** tab of the TalkJS [dashboard](https://talkjs.com/dashboard), or edit `script.js` to view your own data in a TalkJS chatbox.

## About the import script

The import script `runImport.js` calls the scripts in the `importers` directory to import first users, then channels (conversations in TalkJS), then messages.

<div style="background-color: #F9E5D2; padding: 15px;">

  <p><strong>Note:</strong> The script does not remove duplicate messages. If you run the script twice you will end up with two imported copies of the message, even if the messages have the same timestamp.</p>

</div>

### User import

The `userImporter.js` script calls the [create user](https://talkjs.com/docs/REST_API/Users/#create-or-update-a-user) endpoint of the TalkJS REST API.

It maps the following Sendbird user fields to TalkJS [user fields](https://talkjs.com/docs/Concepts/Users/#user-data):

| Sendbird field     | TalkJS field | Required? |
| ------------------ | ------------ | --------- |
| `user_id`          | `id`         | Yes       |
| `nickname`         | `name`       | No        |
| `metadata.emailId` | `email`      | No        |
| `profile_url`      | `photoUrl`   | No        |

#### Conversation (channel) import

The `channelImporter` script calls the [create conversation](https://talkjs.com/docs/REST_API/Conversations/#setting-conversation-data) REST API endpoint.

It maps the following Sendbird channel fields to TalkJS [conversation fields](https://talkjs.com/docs/Concepts/Conversations/#conversation-data):

| TalkJS field | Sendbird field | Required? |
| ------------ | -------------- | --------- |
| `id`         | `channel_url`  | Yes       |
| `subject`    | `name`         | No        |

It then adds users to the conversation as TalkJS [participants](https://talkjs.com/docs/Concepts/Participants/).

#### Message import

The `messageImporter` script calls the [import messages](https://talkjs.com/docs/REST_API/Importing_Messages/) REST API endpoint.

It uploads all Sendbird messages where `is_removed` is false, and where the [Sendbird message type](https://sendbird.com/docs/desk/sdk/v1/javascript/features/messages#2-message-types) is `MESG`. These correspond to TalkJS's [user messages](https://talkjs.com/docs/Concepts/Messages/). The import message endpoint does not support importing [system messages](https://talkjs.com/docs/Concepts/System_Messages/).

TalkJS autogenerates an `id` for each message. Other fields are mapped as follows:

| TalkJS field | Sendbird field | Required? |
| ------------ | -------------- | --------- |
| `sender`     | `user.userId`  | Yes       |
| `text`       | `message`      | Yes       |
| `timestamp`  | `createdAt`    | Yes       |
