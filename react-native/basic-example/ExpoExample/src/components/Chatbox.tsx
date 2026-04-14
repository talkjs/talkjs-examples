import { ActivityIndicator } from "react-native";

import { CurrentUserContext } from "@/app/_layout";
import { APP_ID } from "@/constants/chat";
import * as Talkjs from "@talkjs/expo";
import { useContext, useRef } from "react";

interface Props {
  conversation: Talkjs.ConversationBuilder;
}

export function Chatbox({ conversation }: Props) {
  const me = useContext(CurrentUserContext)!;
  const chatboxRef = useRef<Talkjs.ChatboxRef>(null);

  return (
    <Talkjs.Session appId={APP_ID} me={me} enablePushNotifications={true}>
      <Talkjs.Chatbox
        ref={chatboxRef}
        conversationBuilder={conversation}
        hideKeyboardAccessoryView={true}
        showChatHeader={false}
        loadingComponent={
          <ActivityIndicator
            size="large"
            style={{
              flex: 1,
              alignSelf: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          />
        }
      />
    </Talkjs.Session>
  );
}
