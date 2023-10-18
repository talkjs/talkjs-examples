const talkJsConfig = {
    appId: "<APP_ID>", // Replace this value with your app id 
    userId: "<USER_ID>", // The user id for the user from who's perspective you're using the UI
    /**
     * Below is a couple of example conversations to get you up and running.
     * The conversations are split into two categories, which is also reflected in the UI.
    */
    conversations: {
        channels: [
            {
                id: "remoteWorkMeetup",
                subject: "meetup",
                avatar: "",
                welcomeMessages: ["Welcome to the meetup channel!"]

            },
            {
                id: "remoteWorkRandom",
                subject: "random",
                avatar: "",
                welcomeMessages: ["Welcome to the random channel!"]
            },
            {
                id: "remoteWorkDesign",
                subject: "design",
                avatar: "",
                welcomeMessages: ["Welcome to the design channel!"]
            },
            {
                id: "remoteWorkSales",
                subject: "sales",
                avatar: "",
                welcomeMessages: ["Welcome to the sales channel!"]
            },
        ],
        dms: [
            {
                id: "remoteWorkAnna",
                subject: "Anna",
                avatar: "https://talkjs.com/new-web/avatar-1.jpg",
                welcomeMessages: ["Hi there!"]
            },
            {
                id: "remoteWorkBrian",
                subject: "Brian",
                avatar: "https://talkjs.com/new-web/avatar-2.jpg",
                welcomeMessages: ["Hi there!"]
            },
            {
                id: "remoteWorkClarice",
                subject: "Clarice",
                avatar: "https://talkjs.com/new-web/avatar-6.jpg",
                welcomeMessages: ["Hi there!"]
            },
            {
                id: "remoteWorkDefault",
                subject: "TalkJS",
                avatar: "https://talkjs.com/new-web/avatar-talkjs.jpg",
                welcomeMessages: ["Welcome to the TalkJS team chat demo!"]
            }
        ]
    }
}

export default talkJsConfig;
