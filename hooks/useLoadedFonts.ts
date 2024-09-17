import { useFonts } from "expo-font";

export function useLoadAeonikAndRalewayFonts() {
  const [loaded] = useFonts({
    // Aeonik Trail fonts
    "AeonikTrail-Regular": require("@/assets/fonts/aeonik/AeonikTRIAL-Regular.otf"),
    "AeonikTrail-RegularItalic": require("@/assets/fonts/aeonik/AeonikTRIAL-RegularItalic.otf"),
    "AeonikTrail-Light": require("@/assets/fonts/aeonik/AeonikTRIAL-Light.otf"),
    "AeonikTrail-LightItalic": require("@/assets/fonts/aeonik/AeonikTRIAL-LightItalic.otf"),
    "AeonikTrail-BoldItalic": require("@/assets/fonts/aeonik/AeonikTRIAL-BoldItalic.otf"),
    "AeonikTrail-Bold": require("@/assets/fonts/aeonik/AeonikTRIAL-Bold.otf"),

    // Raleway fonts
    "Raleway-Regular": require("@/assets/fonts/raleway/Raleway-Regular.ttf"),
    "Raleway-Medium": require("@/assets/fonts/raleway/Raleway-Medium.ttf"),
    "Raleway-SemiBold": require("@/assets/fonts/raleway/Raleway-SemiBold.ttf"),
    "Raleway-Bold": require("@/assets/fonts/raleway/Raleway-Bold.ttf"),
    "Raleway-ExtraBold": require("@/assets/fonts/raleway/Raleway-ExtraBold.ttf"),
    "Raleway-Italic": require("@/assets/fonts/raleway/Raleway-Italic.ttf"),
  });

  return loaded;
}
