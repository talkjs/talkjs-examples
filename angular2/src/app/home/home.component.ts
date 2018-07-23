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
  private currentUsername: string;
  private currentConversation;
  private popup;

  constructor(private talkJs: TalkJsService) {}

  loginClick(username) {
    this.talkJs.createSession(username);
    this.ngOnInit();
  }

  ngOnInit() {
    if(this.talkJs.getCurrentUsername()) {
      this.talkJs.getSession().then(session => {
        this.session = session;
        this.currentUsername = this.talkJs.getCurrentUsername();
      });
    }
  }

  startConversation(otherParticipant: string) {
    var me = new Talk.User({id: this.currentUsername, name: this.currentUsername});
    var other = new Talk.User({id: otherParticipant, name: otherParticipant});
    var conversation = this.session.getOrCreateConversation(Talk.oneOnOneId(me, other));
    conversation.setParticipant(me);
    conversation.setParticipant(other);
    var popup = this.session.createPopup(conversation);
    popup.mount({show: true});
  }

}
