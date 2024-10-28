import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const checkData = async () => {
    const token = await AsyncStorage.getItem("token");
    const firstLaunch = await AsyncStorage.getItem("firstLaunch");

    if (!firstLaunch) {
      await AsyncStorage.setItem("firstLaunch", "true");
      router.push("/onboarding");
    } else {
      if (!token) {
        router.push("/login");
      } else {
        router.push("/home");
      }
    }
  };

  useEffect(() => {
    setTimeout(checkData, 3000);
  }, []);

  return <Redirect href="/splashscreen" />;
}
