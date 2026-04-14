import { useContext } from "react";

import { CurrentUserContext } from "@/app/_layout";
import { APP_ID } from "@/constants/chat";
import * as Talkjs from "@talkjs/expo";

interface Props {
  onSelectConversation: (event: Talkjs.SelectConversationEvent) => void;
}

export function ConversationList({ onSelectConversation }: Props) {
  const me = useContext(CurrentUserContext)!;

  return (
    <Talkjs.Session appId={APP_ID} me={me} enablePushNotifications={true}>
      <Talkjs.ConversationList onSelectConversation={onSelectConversation} />
    </Talkjs.Session>
  );
}
