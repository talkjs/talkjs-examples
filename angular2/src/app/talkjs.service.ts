import { Injectable } from '@angular/core';
import Talk from "talkjs";

@Injectable()
export class TalkJsService {
    private session: Promise<Talk.Session>;
    private currentUsername: string;
    private currentUser: Talk.User;

    createSession(username: string) {
        this.currentUsername = username;
        console.log("Logging in as " + username + "...");
        this.session = Talk.ready.then(() => {
            this.currentUser = new Talk.User({
                id: username,
                name: username,
                configuration: 'buyer'
            });
        
            console.log("Logged in.");
            return new Talk.Session({
                appId: 'YOUR APP ID HERE',
                me: this.currentUser
            });
        }) as Promise<Talk.Session>;
    }

    getCurrentUsername() {
        return this.currentUsername;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getSession() {
        return this.session;
    }
}