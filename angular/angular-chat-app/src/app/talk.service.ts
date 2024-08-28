import { Injectable } from '@angular/core';
import Talk from 'talkjs';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class TalkService {
  private currentUser: Talk.User;
  user$;
  constructor(private auth: AuthService) {
    auth.user$.subscribe(user => {
      this.user$ = user;
    })
  }

  async createUser(applicationUser: any) {
    await Talk.ready;
    console.log(this.user$);
    return new Talk.User({
      id: applicationUser.id,
      name: applicationUser.username,
      photoUrl: applicationUser.photoUrl,
      role: applicationUser.role
    });
  }

  async createCurrentSession() {
    await Talk.ready;
    const user = {
      id: this.user$.uid,
      username: this.user$.displayName,
      email: this.user$.email,
      photoUrl: this.user$.photoURL,
      role: 'default'
    };
    this.currentUser = await this.createUser(user);
    const session = new Talk.Session({
         appId: 'YOUR_APP_ID_HERE',
         me: this.currentUser
    });
    return session;
  }

  private async getOrCreateConversation(session: Talk.Session, otherApplicationUser: any) {
    const otherUser = await this.createUser(otherApplicationUser);
    const conversation = session.getOrCreateConversation(Talk.oneOnOneId(this.currentUser, otherUser));
    conversation.setParticipant(this.currentUser);
    conversation.setParticipant(otherUser);
    conversation.setAttributes({
      welcomeMessages: ["Welcome to AllParts Support Chat!", "Leave your message here and one of our support agents will assist you soon."]
  })
    return conversation;
  }

  async createPopup(session: Talk.Session) {
    const supportUser = {
      id: 5,
      username: 'Sebastien',
      email: 'sebastian@allparts.com',
      photoUrl: 'https://randomuser.me/api/portraits/men/71.jpg',
      role: 'default'
    };

    const conversation = await this.getOrCreateConversation(session, supportUser);
    return session.createPopup(conversation, { keepOpen: false });
 }
}
