import {Component, OnInit} from '@angular/core';

const Talk = require('talkjs');

@Component({
  selector: 'app-inbox',
  template: `<div id='talkjs-inbox-container'></div>`
})
export class InboxComponent implements OnInit {
  public talkSession: any;

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

      const inbox = talkSession.createInbox();
      inbox.mount(document.getElementById('talkjs-inbox-container'));
    });
  }
}
