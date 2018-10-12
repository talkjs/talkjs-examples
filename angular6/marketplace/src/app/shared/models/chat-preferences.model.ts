export class ChatPreferences {
    chatButtonColorHex: string;
    chatWelcomeMessage: string;

    constructor(chatButtonColorHex: string, chatWelcomeMessage: string) {
        this.chatButtonColorHex = chatButtonColorHex;
        this.chatWelcomeMessage = chatWelcomeMessage;
    }
}