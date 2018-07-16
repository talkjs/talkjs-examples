import {Component, OnInit} from '@angular/core';
import * as Talk from "talkjs";

@Component({
  selector: 'app-inbox',
  template: `<div id='talkjs-inbox-container'></div>`
})
export class InboxComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    Talk.ready.then(() => {
      const me = new Talk.User({
        id: 'my-id-for-user',
        name: 'John Doe',
        configuration: 'buyer'
      });

      const talkSession = new Talk.Session({
        appId: 'Hku1c4Pt',
        me
      });

      const conversation = talkSession.getOrCreateConversation("order_66");
      conversation.setParticipant(me);
      conversation.setAttributes({
        subject: "Star Wars"
      });
      
      const inbox = talkSession.createInbox({selected: conversation});
      inbox.mount(document.getElementById('talkjs-inbox-container'));
      
      const popup = talkSession.createPopup(conversation, {
        launcher: "always"
      });
      popup.mount({show: false});
      popup.show();

      // talkSession.createPopup()
    });
  }
}
