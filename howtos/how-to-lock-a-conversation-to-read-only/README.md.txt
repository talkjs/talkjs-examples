This is an example project for TalkJS's tutorial on [How to lock a conversation to be read-only](https://talkjs.com/resources/how-to-lock-a-conversation-to-be-read-only/).

The project uses TalkJS's [custom conversation actions](https://talkjs.com/docs/Features/Customizations/Conversation_Actions/) to add a new "Set Read-Only" option to the chat inbox UI. We add code to listen for this custom action and use the [ConversationBuilder.setParticipant](https://talkjs.com/docs/Reference/JavaScript_Chat_SDK/ConversationBuilder/#ConversationBuilder__setParticipant) method to set each participant's access level to read-only.

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)

## How to run the tutorial

1. Clone or download the project.
2. Go to the **Roles** tab of your TalkJS dashboard. Create a new role called "admin".
3. Click on the settings for the new admin role. In the **Custom conversation actions** section, add a new custom conversation action with a name of "setReadOnly" and a label of "Set Read-Only".
4. Replace `<APP_ID>` in the `index.html` file with the value found in your [TalkJS dashboard](https://talkjs.com/dashboard/login).
5. Open index.html, or run debug the program in your IDE of choice.