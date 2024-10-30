import { useEffect } from "react";
import { BackHandler, Alert } from "react-native";
import { usePathname } from "expo-router";

const useBackPressHandler = (paths: string[]) => {
  const pathname = usePathname();

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };

    if (paths.includes(pathname)) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }
  }, [pathname, paths]);
};

export default useBackPressHandler;
