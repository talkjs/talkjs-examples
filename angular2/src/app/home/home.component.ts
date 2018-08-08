import {Component, OnInit} from '@angular/core';
import { TalkJsService } from "../talkjs.service";
import * as Talk from "talkjs";

@Component({
  selector: 'app-home',
  templateUrl: `/home.component.html`,
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  private session: Talk.Session;
  private currentConversation: Talk.ConversationBuilder;
  private popup: Talk.Popup;

  constructor(private talkJs: TalkJsService) {}

  loginClick(username) {
    this.talkJs.createSession(username);
    this.ngOnInit();
  }

  ngOnInit() {
    if(this.talkJs.getCurrentUsername()) {
      this.talkJs.getSession().then(session => {
        this.session = session;
      });
    }
  }

  startConversation(otherParticipant: string) {
    const me = this.talkJs.getCurrentUser();
    var other = new Talk.User({id: otherParticipant, name: otherParticipant});
    this.currentConversation = this.session.getOrCreateConversation(Talk.oneOnOneId(me, other));
    this.currentConversation.setParticipant(me);
    this.currentConversation.setParticipant(other);
    this.popup = this.session.createPopup(this.currentConversation);
    this.popup.mount({show: true});
  }

}
