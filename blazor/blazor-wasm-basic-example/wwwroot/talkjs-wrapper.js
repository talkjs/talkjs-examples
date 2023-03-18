window.TalkWrapper = {
    /** Session for the talk that will be used */
    talkSession: undefined,

    /**
     * Function that creates a conversation between 2 users
     * @param {string} appId - appId from your Talk account
     * @param {object} myUser - object with parameters needed to create a Talk.User object
     * @param {object} otherUsers - array of objects with parameters needed to create Talk.User objects
     * @param {string} outputElementId - Id of the element where we want the window to be output to
     */
    createConversation: function (appId, myUser, otherUsers, outputElementId) {

        // Create a Talk.User object for me
        var me = new Talk.User(myUser);

        // Create a Talk.Session object
        this.talkSession = new Talk.Session({
            appId: appId,
            me: me,
        });

        // Create a conversation with a unique conversation ID
        var conversation = this.talkSession.getOrCreateConversation("CONVERSATION_ID");

        // Add myself as a participant
        conversation.setParticipant(me);

        // Create and add other participants
        for (var i = 0; i < otherUsers.length; i++) {
            var nextUser = new Talk.User(otherUsers[i]);
            conversation.setParticipant(nextUser);
        }

        // Mount a conversation into a given div
        var inbox = this.talkSession.createInbox({ selected: conversation });
        inbox.mount(document.getElementById(outputElementId));
    }
}