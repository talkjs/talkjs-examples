import * as Icon from "react-feather";
import ConversationImage from "./ConversationImage";
import { useEffect, useState } from "react";

const ChatHeader = ({
  conversation,
  goBack,
  mobileChannelSelected,
  setMobileChannelSelected,
}) => {
  const [isThread, setIsThread] = useState(false);

  useEffect(() => {
    const threadPattern = "replyto_";
    if (conversation.id.startsWith(threadPattern)) {
      setIsThread(true);
    } else {
      setIsThread(false);
    }
  }, [conversation]);

  const clickBackButton = () => {
    if (isThread) {
      goBack();
    } else {
      setMobileChannelSelected(false);
    }
  };

  return (
    <div
      className={`h-20 flex flex-col justify-around rounded-t-xl lg:rounded-none lg:rounded-tr-xl mb-4 ${
        mobileChannelSelected ? "rounded-none" : ""
      }`}
      style={{
        borderColor: "#737373",
        borderWidth: "1px",
        borderStyle: "solid",
        backgroundColor: "#404040",
      }}
    >
      <div className="flex flex-row pl-4 items-center">
        <button
          onClick={() => clickBackButton()}
          className={`mr-4 ${isThread ? "" : "lg:hidden"}`}
        >
          <Icon.ChevronLeft size={25} />
        </button>
        <ConversationImage
          image={conversation.avatar ? conversation.avatar : ""}
          imgClass={"w-8"}
          textClass={"text-xl"}
        />
        <h1
          className="text-xl text-bold pl-2"
          style={{
            fontSize: "16px",
          }}
        >
          {conversation.subject}
        </h1>
      </div>
    </div>
  );
};

export default ChatHeader;
