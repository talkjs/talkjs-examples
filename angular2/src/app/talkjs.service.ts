import { Injectable } from '@angular/core';
import * as Talk from "talkjs";

@Injectable()
export class TalkJsService {
    private session: Promise<Talk.Session>;
    private currentUsername: string;

    createSession(username: string) {
        this.currentUsername = username;
        console.log("Logging in as " + username + "...");
        console.log(this.session);
        this.session = Talk.ready.then(() => {
            const me = new Talk.User({
                id: username,
                name: username,
                configuration: 'buyer'
            });
        
            console.log("Logged in.");
            return new Talk.Session({
                appId: 'Hku1c4Pt',
                me
            });
        }) as Promise<Talk.Session>;
    }

    getCurrentUsername() {
        return this.currentUsername;
    }

    getSession() {
        return this.session;
    }
}