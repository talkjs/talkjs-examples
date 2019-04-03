import {Component, OnInit} from '@angular/core';
import Talk from "talkjs";
import { TalkJsService } from '../talkjs.service';

@Component({
  selector: 'app-inbox',
  template: `
    <div *ngIf="currentUser" id='talkjs-inbox-container'>Loading....</div>
    <div *ngIf="!currentUser">Please log in first.</div>
  `
})
export class InboxComponent implements OnInit {
  private session: Promise<Talk.Session>;
  private inbox: Talk.Inbox;
  private currentUser: Talk.User;

  constructor(private talkJs: TalkJsService) {}

  ngAfterViewInit() {
    if(!this.session) {
      return;
    }
    this.session.then(session => {
      this.inbox = session.createInbox();
      this.inbox.mount(document.getElementById('talkjs-inbox-container'));
    });  
  }
  
  ngOnInit() {
    this.currentUser = this.talkJs.getCurrentUser();
    if(this.currentUser) {
      this.session = this.talkJs.getSession();
    }
  }
}
