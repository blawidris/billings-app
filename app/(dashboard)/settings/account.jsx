import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Iconify } from "react-native-iconify";
import { router } from "expo-router";

export default function profile() {
  const logOut = async () => {
    try {
      Alert.alert("Logout", "Are you sure you want to logout?", [
        { text: "Cancel".toLowerCase(), onPress: () => {} },
        {
          text: "Logout".toLocaleLowerCase(),
          onPress: () => {
            router.push("/login");
          },
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <View
        style={{ borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}
        className="relative h-40 bg-primary"
      >
        <Image
          source={require("@/assets/images/card-pattern.png")}
          className="absolute w-full h-full opacity-30"
        />
        <View className="flex items-center justify-center h-full top-10">
          <Text className="text-base text-white font-aeonik-bold">
            Account Settings
          </Text>
        </View>
      </View>
      <View className="">
        <View className="p-5 bg-white">
          <TouchableOpacity className="flex flex-row justify-between mb-4">
            <View className="flex flex-row items-center justify-between">
              <Iconify icon="gravity-ui:person" color="#1e1e1e" size={20} />
              <Text className="font-aeonik text-lg text-[#253B4B] ml-2">
                Change Password
              </Text>
            </View>

            <View className="bg-[#EEF5FC] p-2 rounded-full">
              <Iconify icon="ci:chevron-right" color="#1e1e1e" size={16} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/settings/transaction_pin")}
            className="flex flex-row justify-between mb-4"
          >
            <View className="flex flex-row items-center justify-between">
              <Iconify icon="typcn:cog-outline" color="#1e1e1e" size={20} />
              <Text className="font-aeonik text-lg text-[#253B4B] ml-2">
                Change Transaction Pin
              </Text>
            </View>

            <View className="bg-[#EEF5FC] p-2 rounded-full">
              <Iconify icon="ci:chevron-right" color="#1e1e1e" size={16} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row justify-between mb-4">
            <View className="flex flex-row items-center justify-between">
              <Iconify icon="ri:fingerprint-line" color="#1e1e1e" size={20} />
              <Text className="font-aeonik text-lg text-[#253B4B] ml-2">
                Biometrics
              </Text>
            </View>

            <View className="bg-[#EEF5FC] p-2 rounded-full">
              <Iconify icon="ci:chevron-right" color="#1e1e1e" size={16} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
