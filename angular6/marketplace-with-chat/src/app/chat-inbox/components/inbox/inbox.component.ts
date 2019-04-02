import { Component, OnInit } from '@angular/core';

import Talk from "talkjs";

import { TalkService } from 'src/app/core/services/talk.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  private inbox: Talk.Inbox;

  constructor(private talkService: TalkService) { }

  ngOnInit() {
    this.createInbox();
  }

  ngOnDestroy() {
    if (this.inbox) {
      this.inbox.destroy();
    }
  }

  private async createInbox() {
    this.inbox = await this.talkService.createInbox();
    this.inbox.mount(document.getElementById('talkjs-container'));
      
    this.talkService.destroyAllLoadedPopups();
  }

}
