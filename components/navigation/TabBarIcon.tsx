import React from "react";
import { View, Text } from "react-native";
import { Iconify } from "react-native-iconify";
import { Image } from "expo-image";

type TabBarIconProps = {
  routeName: string;
  focused: boolean;
};

export const TabBarIcon: React.FC<TabBarIconProps> = ({
  routeName,
  focused,
}) => {
  let iconContent;

  switch (routeName) {
    case "home":
      iconContent = (
        <View className="flex flex-col items-center space-y-2">
          {focused ? (
            <Iconify
              icon={"solar:home-angle-2-outline"}
              size={25}
              color={focused ? "#1F6CAB" : "grey"}
            />
          ) : (
            <Iconify
              icon={"solar:home-angle-2-outline"}
              size={25}
              color={focused ? "#1F6CAB" : "grey"}
            />
          )}
          <Text
            className="font-lexend-regular "
            style={{ fontSize: 14, color: focused ? "#1F6CAB" : "grey" }}
          >
            Home
          </Text>
        </View>
      );
      break;
    case "services":
      iconContent = (
        <View className="flex flex-col items-center space-y-2">
          <Iconify
            icon={"octicon:checklist-24"}
            size={25}
            color={focused ? "#1F6CAB" : "grey"}
          />
          <Text
            className="font-lexend-regular"
            style={{ fontSize: 14, color: focused ? "#1F6CAB" : "grey" }}
          >
            Services
          </Text>
        </View>
      );
      break;
    case "profile":
      iconContent = (
        <View className="flex flex-col items-center space-y-2">
          <Iconify
            icon={"iconamoon:profile-thin"}
            size={25}
            color={focused ? "#1F6CAB" : "grey"}
          />
          <Text
            className="font-lexend-regular"
            style={{ fontSize: 14, color: focused ? "#1F6CAB" : "grey" }}
          >
            Profile
          </Text>
        </View>
      );
      break;
    default:
      iconContent = null;
  }

  return iconContent;
};

export default TabBarIcon;
