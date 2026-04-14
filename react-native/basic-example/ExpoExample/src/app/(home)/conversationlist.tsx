import * as Talkjs from "@talkjs/expo";
import { Stack, useRouter } from "expo-router";

import { ConversationList } from "@/components/ConversationList";
import { View } from "react-native";

export default function ConversationListRoute() {
  const router = useRouter();
  const onSelectConversation = (event: Talkjs.SelectConversationEvent) => {
    router.navigate({
      pathname: "/(home)/chatbox",
      params: { conversationId: event.conversation.id },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "ConversationList In Home",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <ConversationList onSelectConversation={onSelectConversation} />
    </View>
  );
}
