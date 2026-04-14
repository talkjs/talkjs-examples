import { Button, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { APP_ID, Alice } from "@/constants/chat";
import { getTalkSession } from "@talkjs/core";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const session = getTalkSession({ appId: APP_ID, userId: Alice.id });
    session.currentUser.get().then((snapshot) => {
      setName(snapshot?.name ?? "");
    });
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedText type="small">Current user: {name}</ThemedText>
      <Button
        title="Go to Chatbox"
        onPress={() => router.navigate("/(home)/chatbox")}
      />
      <Button
        title="Go to ConversationList"
        onPress={() => router.navigate("/(home)/conversationlist")}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
