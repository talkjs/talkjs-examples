import * as Notifications from "expo-notifications";
import { PermissionsAndroid, Platform } from "react-native";

import { APP_ID, Alice } from "@/constants/chat";
import { getTalkSession } from "@talkjs/core";
import {
  getNotificationHandler,
  registerPushNotificationHandlers,
} from "@talkjs/expo";

if (Platform.OS === "android") {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
} else if (Platform.OS === "ios") {
  Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
    },
  });
}

registerPushNotificationHandlers({
  channelId: "com.example.TalkjsExpo",
  channelName: "Messages",
  badge: true,
});

const notificationHandler = getNotificationHandler();
notificationHandler.onTokenRefresh((_, newToken) => {
  // Register the token with the TalkJS backend
  const session = getTalkSession({ appId: APP_ID, userId: Alice.id });
  session.currentUser.createIfNotExists({ name: Alice.name });

  const key = `${newToken.provider}:${newToken.pushRegistrationId}`;

  // NOTE: This replaces any existing tokens.
  session.currentUser.set({ pushTokens: { [key]: true } });

  console.log("push notification token: ", newToken);
});

import "expo-router/entry";
