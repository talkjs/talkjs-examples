import { useCallback, useContext, useLayoutEffect, useState } from "react";

import { CurrentUserContext } from "@/app/_layout";
import { ThemedText } from "@/components/themed-text";
import { APP_ID, DEFAULT_CONVERSATION_ID } from "@/constants/chat";
import { getTalkSession } from "@talkjs/core";
import { Image } from "expo-image";
import { Platform } from "react-native";

export function useChatboxHeader(conversationId?: string) {
  const me = useContext(CurrentUserContext)!;

  const [title, setTitle] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const headerTitle = useCallback(() => {
    const paddingLeft = Platform.OS === "android" ? 10 : 0;

    return <ThemedText style={{ paddingLeft }}>{title}</ThemedText>;
  }, [title]);

  const headerLeft = useCallback(() => {
    if (photoUrl) {
      return (
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 100,
          }}
          source={photoUrl}
          cachePolicy={"memory-disk"}
        />
      );
    }

    return null;
  }, [photoUrl]);

  useLayoutEffect(() => {
    const session = getTalkSession({ appId: APP_ID, userId: me.id });

    const conversationRef = session.conversation(
      conversationId ?? DEFAULT_CONVERSATION_ID,
    );
    const subscription = conversationRef.subscribeParticipants((snapshot) => {
      if (snapshot) {
        if (snapshot.length === 2) {
          const other = snapshot.filter(
            (participantSnapshot) => participantSnapshot.user.id !== me.id,
          )[0];

          setPhotoUrl(other.user.photoUrl);
        }

        let newTitle = "";
        for (let participant of snapshot) {
          if (participant.user.id === me.id) {
            continue;
          }

          if (newTitle) {
            newTitle = `${newTitle}, ${participant.user.name}`;
          } else {
            newTitle = participant.user.name;
          }
        }

        setTitle(newTitle);
      }
    });

    return () => subscription.unsubscribe();
  }, [conversationId, me.id]);

  return { headerTitle, headerLeft };
}
