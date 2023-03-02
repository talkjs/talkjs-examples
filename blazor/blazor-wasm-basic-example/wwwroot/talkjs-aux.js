window.TalkAux = {
    /** Session for the talk that will be used */
    talkSession: undefined,

    /**
     * Function that creates a conversation between 2 users
     * @param {string} appId - appId from your Talk account
     * @param {object} myUser - object with parameters needed to create a Talk.User object
     * @param {object} otherUser - object with parameters needed to create a Talk.User object
     * @param {string} outputElementId - Id of the element where we want the window to be output to
     */
    createOneOnOneConversation: function (appId, myUser, otherUser, outputElementId) {

        // Create Talk.User objects
        var me = new Talk.User(myUser);
        var other = new Talk.User(otherUser);

        // Create a Talk.Session object
        this.talkSession = new Talk.Session({
            appId: appId,
            me: me,
        });

        // Create a conversation
        var conversation = this.talkSession.getOrCreateConversation(
            Talk.oneOnOneId(me, other)
        );
        conversation.setParticipant(me);
        conversation.setParticipant(other);

        // Mount a conversation into a given div
        var inbox = this.talkSession.createInbox({ selected: conversation });
        inbox.mount(document.getElementById(outputElementId));
    }
}