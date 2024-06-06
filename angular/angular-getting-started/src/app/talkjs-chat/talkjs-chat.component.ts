import { Component } from "@angular/core";

import Talk from "talkjs";

@Component({
  selector: "app-talkjs-chat",
  standalone: true,
  imports: [],
  template: `
    <div id="talkjs-container" style="height: 600px">Loading chats..</div>
  `,
  styles: ``,
})
export class TalkjsChatComponent {
  constructor() {
    Talk.ready.then(function () {
      const me = new Talk.User({
        id: "nina",
        name: "Nina",
        email: "nina@example.com",
        photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
        welcomeMessage: "Hi!",
      });
      const session = new Talk.Session({
        appId: "<APP_ID>",
        me: me,
      });
      const other = new Talk.User({
        id: "frank",
        name: "Frank",
        email: "frank@example.com",
        photoUrl: "https://talkjs.com/new-web/avatar-8.jpg",
        welcomeMessage: "Hey, how can I help?",
      });

      const conversation = session.getOrCreateConversation("new_conversation");
      conversation.setParticipant(me);
      conversation.setParticipant(other);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(document.getElementById("talkjs-container"));
    });
  }
}
