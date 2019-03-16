import { User } from "../models/user.model";
import sha1 from "sha1";

const APP_ID = 'Hku1c4Pt';

export function getInboxSelectConversationScript(participants: User[], conversationId: string) : string {
    let script = `Talk.ready.then(function() {
        conversation = window.talkSession.getOrCreateConversation("` + conversationId + `");    

        conversation.setParticipant(window.currentUser);`;

    for (const participant of participants) {
        script += `window.participant` + participant.id + ` = new Talk.User({
            id: "` + 'user_' + participant.id + `", 
            name: "` + participant.username + `"
        });`;
    }

    for (const participant of participants) {
        script += 'conversation.setParticipant(window.participant' + participant.id + ');';
    }

    script += 'window.ui.select(conversation);';
    script += '});';

    return script;
}

export function getInboxLoadScript(currentUser: User) : string {
    return `Talk.ready.then(function() {
        window.currentUser = new Talk.User({
            id: "` + 'user_' + currentUser.id + `",
            name: "` + currentUser.username + `",
            role: "react_native_app"
        });

        window.talkSession = new Talk.Session({
            appId: "` + APP_ID + `",
            me: window.currentUser
        });

        window.ui = window.talkSession.createInbox();
        window.ui.on("conversationSelected", (event) => { postMessage((event.conversation) != null); });
        window.ui.mount(document.getElementById("talkjs-container"));
    });`;
}

export function generateConversationId(participants: User[], currentUser: User) {
    const allParticipants = [...participants, currentUser];
    const sorted = allParticipants.sort(alphabeticalFilter);
    const json = JSON.stringify(sorted);
    const hash = sha1(json);

    return hash.toString().substring(0, 20);
}

const alphabeticalFilter = (a: User, b: User) => { 
    const aLower = a.username.toLowerCase(), bLower = b.username.toLowerCase();

    if (aLower < bLower) {
        return -1;
    }
    else if (aLower > bLower) {
        return 1;
    }
    return 0;
};