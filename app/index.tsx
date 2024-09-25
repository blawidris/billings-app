import { Redirect, router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const checkData = () => {
    router.push("/login");
  };

  useEffect(() => {
    setTimeout(checkData, 3000);
  }, []);

  return <Redirect href="/splashscreen" />;
}
