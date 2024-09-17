import { Stack } from "expo-router";
import "../global.css";
import { useLoadAeonikAndRalewayFonts } from "@/hooks/useLoadedFonts";

export default function RootLayout() {
  const loaded = useLoadAeonikAndRalewayFonts();
  if (!loaded) {
    return null;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
