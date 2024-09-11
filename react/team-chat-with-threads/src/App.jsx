import { useCallback, useState } from "react";
import Talk from "talkjs";
import { Session } from "@talkjs/react";
import talkJsConfig from "./talkJsConfig";
import TeamChat from "./components/TeamChat";

function App() {
  const [unreadMessages, setUnreadMessages] = useState([]); //This is used to create the unread effect in the conversationlist

  const syncUser = useCallback(
    () =>
      new Talk.User({
        id: talkJsConfig.userId,
        name: "Eulalia van Helgen",
        photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
        role: "threads_user",
      }),
    []
  );

  return (
    <Session
      appId={talkJsConfig.appId}
      syncUser={syncUser}
      onUnreadsChange={(unreads) => setUnreadMessages(unreads)}
    >
      <TeamChat unreadMessages={unreadMessages} />
    </Session>
  );
}

export default App;
