import { Injectable } from "@angular/core";

import * as Talk from "talkjs";

import { User } from "src/app/shared/models/user.model";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { Deferred } from "src/app/shared/utils/deffered.util";

@Injectable({
    providedIn: 'root'
})
export class TalkService {
    private static APP_ID = 'Hku1c4Pt';
    private currentTalkUser: Talk.User;
    private loadedPopups: Talk.Popup[];
    private currentSessionDeferred = new Deferred<Talk.Session>();

    constructor(private authenticationService: AuthenticationService) { 
        this.loadedPopups = [];
    }

    async createCurrentSession() {
        await Talk.ready;

        const currentUser = await this.authenticationService.getCurrentUser();
        const currentTalkUser = await this.createTalkUser(currentUser);

        const session = new Talk.Session({
            appId: TalkService.APP_ID,
            me: currentTalkUser
        });
        this.currentTalkUser = currentTalkUser;
        this.currentSessionDeferred.resolve(session);
    }

    async createTalkUser(applicationUser: User) : Promise<Talk.User> {
        await Talk.ready;

        return new Talk.User({
            id: 'talkjs_angular6_marketplace_end_product' + applicationUser.id,
            name: applicationUser.username,
            photoUrl: applicationUser.profilePictureUrl,
            configuration: "demo_default",
            welcomeMessage: applicationUser.chatPreferences.chatWelcomeMessage
         });
    }

    async createPopup(otherApplicationUser: User, keepOpen: boolean) : Promise<Talk.Popup> {
        const session = await this.currentSessionDeferred.promise;
        const conversationBuilder = await this.getOrCreateConversation(session, otherApplicationUser);
        const popup = session.createPopup(conversationBuilder, { keepOpen: keepOpen });

        this.loadedPopups.push(popup);
        return popup;
    }

    async createChatbox(otherApplicationUser: User) : Promise<Talk.Chatbox> {
        const session = await this.currentSessionDeferred.promise;
        const conversationBuilder = await this.getOrCreateConversation(session, otherApplicationUser);

        return session.createChatbox(conversationBuilder);
    }

    async createInbox() : Promise<Talk.Inbox> {
        const session = await this.currentSessionDeferred.promise;

        return session.createInbox();
    }

    destroyAllLoadedPopups() {
        if (this.loadedPopups.length > 0) {
            this.loadedPopups.forEach(p => p.destroy());
            this.loadedPopups = [];
        }
    }

    private async getOrCreateConversation(session: Talk.Session, otherApplicationUser: User) {
        const otherTalkUser = await this.createTalkUser(otherApplicationUser);
        
        const conversationBuilder = session.getOrCreateConversation(Talk.oneOnOneId(this.currentTalkUser, otherTalkUser));
        conversationBuilder.setParticipant(this.currentTalkUser);
        conversationBuilder.setParticipant(otherTalkUser);

        return conversationBuilder;
    }
}