import { Stack } from "expo-router";

export const unstable_settings = {
  conversations: {
    initialRouteName: "conversations_tab",
  },
};

export default function SharedLayout() {
  return <Stack />;
}
