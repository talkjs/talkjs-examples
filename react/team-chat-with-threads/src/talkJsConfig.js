const talkJsConfig = {
  appId: "<APP_ID>", // Replace this value with your app id
  userId: "threadsChatDemoUser", // The user id for the user from who's perspective you're using the UI
  /**
   * Below is a couple of example conversations to get you up and running.
   * The conversations are split into two categories, which is also reflected in the UI.
   */
  conversations: {
    channels: [
      {
        id: "threadsChatMeetup",
        subject: "meetup",
        avatar: "",
        welcomeMessages: ["Welcome to the meetup channel!"],
      },
      {
        id: "threadsChatRandom",
        subject: "random",
        avatar: "",
        welcomeMessages: ["Welcome to the random channel!"],
      },
      {
        id: "threadsChatDesign",
        subject: "design",
        avatar: "",
        welcomeMessages: ["Welcome to the design channel!"],
      },
      {
        id: "threadsChatSales",
        subject: "sales",
        avatar: "",
        welcomeMessages: ["Welcome to the sales channel!"],
      },
    ],
    dms: [
      {
        id: "threadsChatAnna",
        subject: "Anna",
        avatar: "https://talkjs.com/new-web/avatar-1.jpg",
        welcomeMessages: ["Hi there!"],
        role: "default",
      },
      {
        id: "threadsChatBrian",
        subject: "Brian",
        avatar: "https://talkjs.com/new-web/avatar-2.jpg",
        welcomeMessages: ["Hi there!"],
        role: "default",
      },
      {
        id: "threadsChatClarice",
        subject: "Clarice",
        avatar: "https://talkjs.com/new-web/avatar-6.jpg",
        welcomeMessages: ["Hi there!"],
        role: "default",
      },
    ],
  },
};

export default talkJsConfig;
