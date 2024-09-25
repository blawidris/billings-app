import { Stack } from "expo-router";
import "../global.css";
import { useLoadAeonikAndRalewayFonts } from "@/hooks/useLoadedFonts";
import { Iconify } from "react-native-iconify";
import { View, Text } from "react-native";
import Toast, {
  BaseToast,
  ToastConfigParams,
} from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { ThemeProvider } from "styled-components/native";
import { theme } from "@/infrastructure/theme";

export default function RootLayout() {
  const toastConfig = {
    success: (props: ToastConfigParams<any>) => (
      <BaseToast
        {...props}
        style={{ backgroundColor: "green" }}
        text1Style={{
          color: "white",
        }}
        text2Style={{
          color: "white",
        }}
      />
    ),
    error: ({ text1, ...rest }: ToastConfigParams<any>) => (
      <View className="flex flex-col items-center w-screen">
        <View
          style={{ height: 60, width: "90%" }}
          className="flex flex-row items-center p-2 space-x-2 bg-red-500 rounded-lg"
        >
          <View>
            <Iconify
              icon="fluent:error-circle-12-regular"
              size={20}
              color="white"
            />
          </View>

          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "white",
              }}
            >
              {text1}
            </Text>
          </View>
        </View>
      </View>
    ),
    customIcon: ({ text1, ...rest }: ToastConfigParams<any>) => (
      <View className="flex flex-col items-center w-screen">
        <View
          style={{ height: 60, width: "90%" }}
          className="flex flex-row items-center p-2 space-x-2 bg-green-500 rounded-lg"
        >
          <View>
            <Iconify
              icon="lets-icons:done-ring-round-fill"
              size={20}
              color="white"
            />
          </View>

          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "white",
              }}
            >
              {text1}
            </Text>
          </View>
        </View>
      </View>
    ),
  };
  const loaded = useLoadAeonikAndRalewayFonts();
  if (!loaded) {
    return null;
  }
  return (
    <GestureHandlerRootView>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
          <Toast config={toastConfig} />
        </Provider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
