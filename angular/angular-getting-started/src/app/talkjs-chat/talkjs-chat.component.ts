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
    Talk.ready.then((): void => {
      const me = new Talk.User("sample_user_alice");
      const talkSession = new Talk.Session({
        appId: "<APP_ID>",
        me: me,
      });

      const conversation = talkSession.getOrCreateConversation(
        "sample_conversation"
      );
      conversation.setParticipant(me);

      const chatbox = talkSession.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(document.getElementById("talkjs-container"));
    });
  }
}
