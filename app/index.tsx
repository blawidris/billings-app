import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router, usePathname } from "expo-router";
import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";

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

  const pathname = usePathname();

  const paths = ["/login", "/home"];

  useEffect(() => {}, [pathname, paths]);

  useEffect(() => {
    //setTimeout(checkData, 3000);
  }, []);

  return <Redirect href="/home" />;
}
