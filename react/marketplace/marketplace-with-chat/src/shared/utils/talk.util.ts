import Talk from 'talkjs';

import { User } from '../models/user.model';

let loadedPopups: Talk.Popup[] = [];

export const appId = 'YOUR APP ID HERE';

export async function createTalkUser(applicationUser: User) : Promise<Talk.User> {
    await Talk.ready;

    return new Talk.User({
        id: 'talkjs_react_marketplace' + applicationUser.id,
        name: applicationUser.username,
        photoUrl: applicationUser.profilePictureUrl,
        configuration: 'demo_default',
        welcomeMessage: applicationUser.chatPreferences.chatWelcomeMessage
        });
}

export async function getOrCreateConversation(session: Talk.Session, currentUser: User, otherUser: User) {   
    const currentTalkUser = await createTalkUser(currentUser);
    const otherTalkUser = await createTalkUser(otherUser);
    
    const conversationBuilder = session.getOrCreateConversation(Talk.oneOnOneId(currentTalkUser, otherTalkUser));
    conversationBuilder.setParticipant(currentTalkUser);
    conversationBuilder.setParticipant(otherTalkUser);

    return conversationBuilder;
}

export function addPopup(popup: Talk.Popup) {
    loadedPopups.push(popup);
}

export function destroyAllPopups() {
    if (loadedPopups.length > 0) {
        loadedPopups.forEach(p => p.destroy());
        loadedPopups = [];
    }
}