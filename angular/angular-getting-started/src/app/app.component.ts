import { Component } from "@angular/core";
import { TalkjsChatComponent } from "./talkjs-chat/talkjs-chat.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [TalkjsChatComponent],
  template: ` <app-talkjs-chat></app-talkjs-chat> `,
  styles: [],
})
export class AppComponent {
  title = "angular-getting-started";
}
