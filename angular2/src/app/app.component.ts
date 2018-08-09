import {Component} from '@angular/core';
import { TalkJsService } from './talkjs.service';

@Component({
  selector: 'app-root',
  template: `
  <h1>TalkJS using Angular2</h1>
  <div class="navbar">
    <a routerLink="/">Home</a>
    <a routerLink="/inbox">Inbox</a>
  </div>
  <router-outlet></router-outlet>
  `,
  styleUrls: ["./app.component.css"],
  providers: [TalkJsService]
})
export class AppComponent {
  currentUser = undefined;
  
}
