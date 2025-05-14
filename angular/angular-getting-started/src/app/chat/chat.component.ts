import { Component } from "@angular/core";

import Talk from "talkjs";

@Component({
  selector: "app-chat",
  standalone: true,
  imports: [],
  template: `
    <div id="talkjs-container" style="height: 600px">Loading chats..</div>
  `,
  styles: ``,
})
export class ChatComponent {
  constructor() {
    Talk.ready.then(function () {
      const session = new Talk.Session({
        appId: "<APP_ID>",
        userId: "nina",
      });
      session.currentUser.createIfNotExists({
        name: "Nina",
        email: "nina@example.com",
        photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
        welcomeMessage: "Hi!",
      });

      const otherRef = session.user("frank");
      otherRef.createIfNotExists({
        name: "Frank",
        email: "frank@example.com",
        photoUrl: "https://talkjs.com/new-web/avatar-8.jpg",
        welcomeMessage: "Hey, how can I help?",
      });

      const conversationRef = session.conversation("new_conversation");
      conversationRef.createIfNotExists();
      conversationRef.participant(otherRef).createIfNotExists();

      const chatbox = session.createChatbox();
      chatbox.select(conversationRef);
      chatbox.mount(document.getElementById("talkjs-container"));
    });
  }
}
