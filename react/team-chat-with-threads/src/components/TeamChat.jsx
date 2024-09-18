import { useState, useCallback, useRef } from "react";
import Talk from "talkjs";
import { Chatbox, useSession } from "@talkjs/react";
import talkJsConfig from "../talkJsConfig";
import CategoryCollapse from "./CategoryCollapse";
import ConversationListItem from "./ConversationListItem";
import ChatHeader from "./ChatHeader";

const TeamChat = ({ unreadMessages }) => {
  const initialConversation = talkJsConfig.conversations.channels[0];
  const [currentConversation, setCurrentConversation] =
    useState(initialConversation);

  const session = useSession();
  const chatboxRef = useRef(null);

  const [mobileChannelSelected, setMobileChannelSelected] = useState(true); //This is used to control whether or not to display the chatbox or the inbox while on mobile displays

  const [historyStack, setHistoryStack] = useState([]);

  const goBack = () => {
    const conversation = historyStack[historyStack.length - 1];
    setHistoryStack((prevStack) => prevStack.slice(0, -1));

    if (session?.isAlive) {
      const talkJsConversation = session.getOrCreateConversation(
        conversation.id
      );
      const me = new Talk.User({
        id: talkJsConfig.userId,
        name: "Eulalia Van Helgen",
        photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
        role: "threads_user",
      });
      talkJsConversation.setParticipant(me);

      setMobileChannelSelected(true);
      setCurrentConversation(conversation);

      if (chatboxRef.current?.isAlive) {
        chatboxRef.current.select(talkJsConversation);
      }
    }
  };

  const changeConversation = (conversation) => {
    if (session?.isAlive) {
      const talkJsConversation = session.getOrCreateConversation(
        conversation.id
      );
      const me = new Talk.User(talkJsConfig.userId);

      talkJsConversation.setParticipant(me);
      talkJsConversation.setAttributes(conversation);
      setMobileChannelSelected(true);
      setCurrentConversation(conversation);

      if (chatboxRef.current?.isAlive) {
        chatboxRef.current.select(talkJsConversation);
      }
    }
  };

  const syncConversation = useCallback((session) => {
    const defaultConv = session.getOrCreateConversation("remoteWorkMeetup");
    defaultConv.setParticipant(session.me);
    return defaultConv;
  }, []);

  async function postMessageData(
    messageId,
    conversationId,
    messageText,
    participants
  ) {
    try {
      const response = await fetch("http://localhost:3001/new-thread", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId,
          conversationId,
          messageText,
          participants,
        }),
      });

      // if (!response.ok) {
      //   throw new Error(errorData.error);
      // }
    } catch (error) {
      console.log("there was an error creating a new thread");
    }
  }

  const findConversation = (convId) => {
    const allConversation = [
      ...talkJsConfig.conversations.dms,
      ...talkJsConfig.conversations.channels,
    ];

    const foundConversation = allConversation.find(
      (conv) => conv.id === convId
    );

    if (!foundConversation) {
      return {
        id: convId,
        subject: "Replies",
        avatar: "",
      };
    } else {
      return foundConversation;
    }
  };

  const replyInThread = (event) => {
    postMessageData(
      event.message.id,
      event.message.conversation.id,
      event.message.body,
      Object.keys(event.message.conversation.participants)
    );

    if (session?.isAlive) {
      let thread = session.getOrCreateConversation(
        "replyto_" + event.message.id
      );
      const me = new Talk.User(talkJsConfig.userId);
      thread.setParticipant(me);

      if (chatboxRef.current?.isAlive) {
        chatboxRef.current.select(thread);
      }

      setCurrentConversation({
        id: "replyto_" + event.message.id,
        avatar: "",
        subject: "Replies",
      });

      setHistoryStack((prevStack) => [
        ...prevStack,
        findConversation(event.message.conversation.id),
      ]);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-row bg-gray-900 text-white border-none">
        <div
          className={`flex flex-col ${
            mobileChannelSelected
              ? "lg:w-1/3 hidden lg:block"
              : "lg:w-1/3 w-full"
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
            mobileChannelSelected
              ? "lg:w-2/3 w-full"
              : "lg:w-2/3 hidden lg:block"
          }`}
        >
          <div className="h-20 w-full">
            <ChatHeader
              conversation={currentConversation}
              mobileChannelSelected={mobileChannelSelected}
              setMobileChannelSelected={setMobileChannelSelected}
              goBack={goBack}
            />
          </div>

          <Chatbox
            syncConversation={syncConversation}
            className="h-full w-full overflow-hidden rounded-b-xl lg:rounded-none lg:rounded-br-xl"
            showChatHeader={false}
            theme="threads_chat"
            chatboxRef={chatboxRef}
            onCustomMessageAction={replyInThread}
          />
        </div>
      </div>
    </>
  );
};

export default TeamChat;
