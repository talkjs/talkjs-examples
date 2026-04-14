import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as Talkjs from "@talkjs/expo";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import React, { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

import { Alice, APP_ID } from "@/constants/chat";
import { Colors } from "@/constants/theme";
import { getTalkSession } from "@talkjs/core";
import { useRouter } from "expo-router";

export const CurrentUserContext = createContext<Talkjs.User | null>(null);
export const TabBarContext = createContext<{
  setIsTabBarHidden: (hidden: boolean) => void;
}>({
  setIsTabBarHidden: () => {},
});

export default function TabLayout() {
  const router = useRouter();

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === "unspecified" ? "light" : colorScheme];

  const notificationHandler = Talkjs.getNotificationHandler();
  notificationHandler.onNotificationPressed((event) => {
    if (!event.isForegroundEvent) {
      router.navigate({
        pathname: "/chatbox",
        params: {
          conversationId: event.data?.conversationId,
          shouldHideTabBar: "true",
        },
      });
    }
  });

  useEffect(() => {
    const session = getTalkSession({ appId: APP_ID, userId: Alice.id });
    session.currentUser.createIfNotExists({ ...Alice });
    session.currentUser.set({ ...Alice });

    const subscription = session.currentUser.subscribe();

    return () => subscription.unsubscribe();
  }, []);

  const [isTabBarHidden, setIsTabBarHidden] = useState(false);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <TabBarContext.Provider value={{ setIsTabBarHidden }}>
        {/* Ideally you would get the current User from your backend. */}
        <CurrentUserContext.Provider value={Alice}>
          <NativeTabs
            hidden={isTabBarHidden}
            backgroundColor={colors.background}
            indicatorColor={colors.backgroundElement}
            labelStyle={{ selected: { color: colors.text } }}
          >
            <NativeTabs.Trigger name="(home)">
              <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
              <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="(conversations)">
              <NativeTabs.Trigger.Label>Conversations</NativeTabs.Trigger.Label>
              <NativeTabs.Trigger.Icon sf="message.circle" md="message" />
            </NativeTabs.Trigger>
          </NativeTabs>
        </CurrentUserContext.Provider>
      </TabBarContext.Provider>
    </ThemeProvider>
  );
}
