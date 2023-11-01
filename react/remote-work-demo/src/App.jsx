import talkJsConfig from "./talkJsConfig";
import { useState, useRef, useCallback } from "react";
import Talk from "talkjs";
import CategoryCollapse from "./components/CategoryCollapse";
import ConversationListItem from "./components/ConversationListItem";
import ChatHeader from "./components/ChatHeader";
import { Session, Chatbox } from "@talkjs/react";

function App() {
  const initialConversation = talkJsConfig.conversations.channels[0];
  const [currentConversation, setCurrentConversation] =
    useState(initialConversation);

  const sessionRef = useRef(null);
  const chatboxRef = useRef(null);

  const [mobileChannelSelected, setMobileChannelSelected] = useState(true); //This is used to control whether or not to display the chatbox or the inbox while on mobile displays
  const [unreadMessages, setUnreadMessages] = useState([]); //This is used to create the unread effect in the conversationlist

  const changeConversation = (conversation) => {
    if (sessionRef.current?.isAlive) {
      const talkJsConversation = sessionRef.current.getOrCreateConversation(
        conversation.id
      );

      const me = new Talk.User({
        id: talkJsConfig.userId,
        name: "Eulalia Van Helgen",
        photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
        role: "default",
      });

      talkJsConversation.setParticipant(me);
      talkJsConversation.setAttributes(conversation);
      setMobileChannelSelected(true);
      setCurrentConversation(conversation);
      if (chatboxRef.current?.isAlive) {
        chatboxRef.current.select(talkJsConversation);
      }
    }
  };

  const syncUser = useCallback(
    () =>
      new Talk.User({
        id: talkJsConfig.userId,
        name: "Eulalia Van Helgen",
        photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
        role: "default",
      }),
    []
  );

  const syncConversation = useCallback((session) => {
    const other = new Talk.User({
      id: "remoteWorkOther",
      name: "TalkJS",
      photoUrl: "https://talkjs.com/new-web/avatar-talkjs.jpg",
      welcomeMessage:
        "Hi there 👋 \nThis is our chat demo and you can test it out in any way you like. Play with some of the chat features, kick the tyres a little, and experience what you could easily build with TalkJS. Also consider checking out our Docs: https://talkjs.com/docs/",
      role: "default",
    });

    const defaultConv = session.getOrCreateConversation("remoteWorkWelcome");
    defaultConv.setParticipant(session.me);
    defaultConv.setParticipant(other);
    return defaultConv;
  }, []);

  return (
    <div className="w-full h-screen flex flex-row bg-gray-900 text-white border-none">
      <div
        className={`flex flex-col ${
          mobileChannelSelected ? "lg:w-1/3 hidden lg:block" : "lg:w-1/3 w-full"
        }`}
        style={{
          borderColor: "#737373",
          borderWidth: "0 0 0 0",
          borderStyle: "solid",
        }}
      >
        <div
          className="h-20 flex flex-col justify-around rounded-t-xl lg:rounded-none lg:rounded-tl-xl rounded-tl-xl mb-4"
          style={{
            borderColor: "#737373",
            borderWidth: "1px 0 1px 1px",
            borderStyle: "solid",
            backgroundColor: "#404040",
          }}
        >
          <h1
            className="text-xl text-bold pl-4"
            style={{
              fontSize: "16px",
            }}
          >
            Channels
          </h1>
        </div>

        <CategoryCollapse title={"Channels"}>
          {talkJsConfig.conversations.channels.map((channel, key) => {
            return (
              <ConversationListItem
                conversation={channel}
                key={key}
                changeConversation={changeConversation}
                unreadMessages={unreadMessages}
                currentConversation={currentConversation}
              />
            );
          })}
        </CategoryCollapse>

        <CategoryCollapse title={"Direct messages"}>
          {talkJsConfig.conversations.dms.map((dm, key) => {
            return (
              <ConversationListItem
                conversation={dm}
                key={key}
                changeConversation={changeConversation}
                unreadMessages={unreadMessages}
                currentConversation={currentConversation}
              />
            );
          })}
        </CategoryCollapse>
      </div>

      <div
        className={`flex flex-col ${
          mobileChannelSelected ? "lg:w-2/3 w-full" : "lg:w-2/3 hidden lg:block"
        }`}
      >
        <div className="h-20 w-full">
          <ChatHeader
            conversation={currentConversation}
            mobileChannelSelected={mobileChannelSelected}
            setMobileChannelSelected={setMobileChannelSelected}
          />
        </div>
        <Session
          appId={talkJsConfig.appId}
          syncUser={syncUser}
          sessionRef={sessionRef}
          onUnreadsChange={(unreads) => setUnreadMessages(unreads)}
        >
          <Chatbox
            chatboxRef={chatboxRef}
            syncConversation={syncConversation}
            className="h-full w-full overflow-hidden rounded-b-xl lg:rounded-none lg:rounded-br-xl"
            showChatHeader={false}
            theme="team_chat"
          />
        </Session>
      </div>
    </div>
  );
}

export default App;
