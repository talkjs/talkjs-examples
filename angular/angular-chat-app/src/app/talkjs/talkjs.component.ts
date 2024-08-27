import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Talk from 'talkjs';
import { AuthService } from '../auth.service';
import { TalkService } from '../talk.service';

@Component({
  selector: 'app-talkjs',
  templateUrl: './talkjs.component.html',
  styleUrls: ['./talkjs.component.css']
})
export class TalkjsComponent implements OnInit {
  private popup: Talk.Popup;
  private session: Talk.Session;
  @ViewChild('talkjsContainer') talkjsContainer!: ElementRef;
  constructor(private talkService: TalkService, public auth: AuthService) {
  }
  ngOnInit(): void {
    this.createPopup();
  }
  private async createPopup() {
    const session = await this.talkService.createCurrentSession();
    this.popup = await this.talkService.createPopup(session);
    this.popup.mount(this.talkjsContainer.nativeElement);
  }
}
