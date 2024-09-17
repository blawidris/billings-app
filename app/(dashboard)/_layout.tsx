import { View, Text, StyleSheet } from "react-native";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import React from "react";
import { Tabs } from "expo-router";
import TabBarIcon from "@/components/navigation/TabBarIcon";

export default function TabsView() {
  return (
    <Tabs
      backBehavior="history"
      screenOptions={({ route }): BottomTabNavigationOptions => ({
        tabBarActiveTintColor: "#02111E",
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused }) => (
          <TabBarIcon routeName={route.name} focused={focused} />
        ),
      })}
    >
      <Tabs.Screen name="home" options={{ title: "" }} />
      <Tabs.Screen name="services" options={{ title: "" }} />
      <Tabs.Screen name="profile" options={{ title: "" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    paddingTop: 10,
    height: 72,
    position: "absolute",
    elevation: 0,
    backgroundColor: "white",
    borderTopColor: "white",
  },
});
