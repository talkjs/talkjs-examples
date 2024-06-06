import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from 'src/app/chat-inbox/chat-inbox.routing';
import { InboxComponent } from 'src/app/chat-inbox/components/inbox/inbox.component';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [InboxComponent]
})
export class ChatInboxModule { }
