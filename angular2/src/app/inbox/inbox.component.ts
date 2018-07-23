import {Component, OnInit} from '@angular/core';
import * as Talk from "talkjs";
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
  private currentUser: string;

  constructor(private talkJs: TalkJsService) {}

  ngAfterViewInit() {
    if(!this.session) {
      return;
    }
    this.session.then(session => {
      const inbox = session.createInbox();
      inbox.mount(document.getElementById('talkjs-inbox-container'));
    });  
  }
  
  ngOnInit() {
    this.currentUser = this.talkJs.getCurrentUsername();
    if(this.currentUser) {
      this.session = this.talkJs.getSession();
    }
  }
}
