# How to lock a conversation to be read-only

This is an example project for TalkJS's tutorial on [How to lock a conversation to be read-only](https://talkjs.com/resources/how-to-lock-a-conversation-to-be-read-only/).

The project uses TalkJS's [custom conversation actions](https://talkjs.com/docs/Features/Customizations/Conversation_Actions/) to add a new "Set read-only" option to the chat inbox UI. We add code to listen for this custom action and use the [ConversationBuilder.setParticipant](https://talkjs.com/docs/Reference/JavaScript_Chat_SDK/ConversationBuilder/#ConversationBuilder__setParticipant) method to set each participant's access level to read-only.

> [!TIP]
> [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/howtos.how-to-lock-a-conversation-to-read-only.zip)

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)

## How to run the tutorial

1. Clone or [download this project](https://github.com/talkjs/talkjs-examples/releases/latest/download/howtos.how-to-lock-a-conversation-to-read-only.zip).
2. At the top of the **Chat UI** page of your [TalkJS dashboard](https://talkjs.com/dashboard/), select **Edit roles** and create a new role called "admin".
3. Again on the **Chat UI** page, select to edit the settings for the new admin role. 
4. Go to the **Custom conversation actions** section on the same page, and add a new custom conversation action with a name of "setReadOnly" and a label of "Set Read-Only".
5. Replace `<APP_ID>` in the `index.html` file with the value found in your [TalkJS dashboard](https://talkjs.com/dashboard/login).
6. Open `index.html` to view the chat.

