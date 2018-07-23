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
  private currentUser: string;
  private currentConversation;
  private popup;

  constructor(private talkJs: TalkJsService) {}

  loginClick(someUser) {
    this.talkJs.createSession(someUser);
    this.ngOnInit();
  }

  ngOnInit() {
    this.currentUser = this.talkJs.getCurrentUsername();
    if(this.currentUser) {
      this.talkJs.getSession().then(session => {
        this.session = session;
      });  
    }
  }

  startConversation(otherParticipant) {
    var conversation = this.session.getOrCreateConversation("Topic XYZ");
    console.log(this.session);
    var popup = this.session.createPopup(conversation);
    popup.mount({show: true});
    popup.show();
  }

}
