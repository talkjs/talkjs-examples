This is an example project for TalkJS's tutorial on [how to add a custom link to a user's profile](https://talkjs.com/resources/how-to-make-a-clickable-link-to-a-users-profile/).

This project uses TalkJS's [custom header feature](https://talkjs.com/docs/Features/Customizations/Creating_Custom_Headers/). The custom header in this example contains a link that leads to user's profile page.

The frontend fetches the data from a backend ExpressJS server that returns the list of users, the information about the current user and the current template.

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

## How to run the tutorial

1. Clone or download the project
2. Replace `<APP_ID>` in `server.js` with the value found in your [TalkJS dashboard](https://talkjs.com/dashboard/login).
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the server.
5. Add an action button to the chat header of your theme:
   1. Go to the **Themes** tab of the TalkJS dashboard.
   2. Select to **Edit** your current theme.
   3. In the list of **Built-in Components**, select **ChatHeader**.
   4. Find the code for displaying the user's name in the header (something like `<span>{{user.name}}</span>`) and replace it with the following:
      ```
      <span><ActionButton action="goToProfile" data-userId="{{user.id}}">{{user.name}}</ActionButton></span>
      ```
   5. Find the code for displaying the conversation image in the header (something like `<ConversationImage conversation="{{ conversation }}" />`) and replace it with the following:
      ```
      <ActionButton t:if="{{ conversation.otherParticipants.length == 1 }}" class="action-button-image" action="goToProfile" data-userId="{{ conversation.otherParticipants[0].id }}"><ConversationImage conversation="{{ conversation }}" /></ActionButton>
      <ConversationImage t:else conversation="{{ conversation }}" />
      ```
   6. In the `<style>` section at the bottom of the template file, add the following CSS code:
      ```css
      .header .image button[data-action] {
        border-radius: 50%;
      }
      ```
   7. If you are in Live mode, select **Copy to live**.
