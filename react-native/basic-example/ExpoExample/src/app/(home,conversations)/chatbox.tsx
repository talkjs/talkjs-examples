import * as Talkjs from "@talkjs/expo";

import { Chatbox } from "@/components/Chatbox";
import { DEFAULT_CONVERSATION_ID } from "@/constants/chat";
import { useChatboxHeader } from "@/hooks/use-chatbox";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabBarContext } from "../_layout";

export default function ChatboxRoute() {
  const insets = useSafeAreaInsets();
  const { conversationId, shouldHideTabBar } = useLocalSearchParams<{
    conversationId: string;
    shouldHideTabBar?: string;
  }>();
  const { setIsTabBarHidden } = useContext(TabBarContext);

  useFocusEffect(() => {
    if (shouldHideTabBar && JSON.parse(shouldHideTabBar)) {
      setIsTabBarHidden(true);

      return () => setIsTabBarHidden(false);
    }
  });

  const { headerTitle, headerLeft } = useChatboxHeader(conversationId);

  let conversation: Talkjs.ConversationBuilder;
  if (conversationId) {
    conversation = Talkjs.getConversationBuilder(conversationId);
  } else {
    const other: Talkjs.User = {
      id: "sample_user_sebastian",
      name: "Sebastian",
      email: "Sebastian@example.com",
      photoUrl: "https://talkjs.com/images/avatar-5.jpg",
      role: "default",
    };

    conversation = Talkjs.getConversationBuilder(DEFAULT_CONVERSATION_ID);
    conversation.setParticipant(other);
  }
  const paddingBottom =
    !shouldHideTabBar && Platform.OS === "ios" ? insets.bottom : undefined;

  return (
    <View style={{ flex: 1, paddingBottom }}>
      <Stack.Screen
        options={{
          headerTitle,
          headerLeft,
          headerBackVisible: true,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Chatbox conversation={conversation} />
    </View>
  );
}
