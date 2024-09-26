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
        className="relative h-48 bg-primary"
      >
        <Image
          source={require("@/assets/images/card-pattern.png")}
          className="absolute w-full h-full opacity-30"
        />
        <View className="flex items-center justify-center h-full top-20">
          <Text className="text-base text-white font-aeonik-bold">Profile</Text>
          <View className="bg-primary p-5 rounded-3xl relative border-[0.5px] border-white mt-2 flex items-center h-auto">
            <View className="p-1 border border-white rounded-full">
              <Image
                className="w-20 h-20 rounded-full"
                source={{
                  uri: "https://images.unsplash.com/photo-1698745219621-b343bbd31637?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
              />
            </View>
            <Text className="text-sm text-white font-aeonik-bold">
              Arome Moses Yahaya
            </Text>
            <View className="flex flex-row mt-2">
              <View
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                className="flex flex-row items-center p-2 mr-1 rounded-full"
              >
                <Text className="mr-1 text-sm text-white font-aeonik">
                  PB ID: @st_emmanuel
                </Text>
                <Image
                  source={require("@/assets/images/clipboard.png")}
                  className="w-[10px] ml-1 h-[10px] "
                />
              </View>
              <View
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                className="flex flex-row items-center p-2 mr-1 rounded-full"
              >
                <Text className="mr-1 text-sm text-white font-aeonik">
                  WEMA: 1022775588
                </Text>
                <Image
                  source={require("@/assets/images/clipboard.png")}
                  className="w-[10px] ml-1 h-[10px] "
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="top-32">
        <View className="p-2">
          <Text className="text-base font-aeonik">General Settings</Text>
        </View>
        <View className="p-5 bg-white">
          <TouchableOpacity className="flex flex-row justify-between mb-4">
            <View className="flex flex-row items-center justify-between">
              <Iconify icon="gravity-ui:person" color="#1e1e1e" size={20} />
              <Text className="font-aeonik text-lg text-[#253B4B] ml-2">
                Profile Information
              </Text>
            </View>

            <View className="bg-[#EEF5FC] p-2 rounded-full">
              <Iconify icon="ci:chevron-right" color="#1e1e1e" size={16} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/settings")}
            className="flex flex-row justify-between mb-4"
          >
            <View className="flex flex-row items-center justify-between">
              <Iconify icon="typcn:cog-outline" color="#1e1e1e" size={20} />
              <Text className="font-aeonik text-lg text-[#253B4B] ml-2">
                Settings
              </Text>
            </View>

            <View className="bg-[#EEF5FC] p-2 rounded-full">
              <Iconify icon="ci:chevron-right" color="#1e1e1e" size={16} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row justify-between mb-4">
            <View className="flex flex-row items-center justify-between">
              <Iconify icon="ph:wallet-bold" color="#1e1e1e" size={20} />
              <Text className="font-aeonik text-lg text-[#253B4B] ml-2">
                My Referral
              </Text>
            </View>

            <View className="bg-[#EEF5FC] p-2 rounded-full">
              <Iconify icon="ci:chevron-right" color="#1e1e1e" size={16} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row justify-between mb-4">
            <View className="flex flex-row items-center justify-between">
              <Iconify icon="ic:outline-live-help" color="#1e1e1e" size={20} />
              <Text className="font-aeonik text-lg text-[#253B4B] ml-2">
                Help & Support
              </Text>
            </View>

            <View className="bg-[#EEF5FC] p-2 rounded-full">
              <Iconify icon="ci:chevron-right" color="#1e1e1e" size={16} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row justify-between mb-4">
            <View className="flex flex-row items-center justify-between">
              <Iconify icon="prime:calendar" color="#1e1e1e" size={20} />
              <Text className="font-aeonik text-lg text-[#253B4B] ml-2">
                Legal
              </Text>
            </View>

            <View className="bg-[#EEF5FC] p-2 rounded-full">
              <Iconify icon="ci:chevron-right" color="#1e1e1e" size={16} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={logOut}
            className="flex flex-row justify-between mb-4"
          >
            <View className="flex flex-row items-center justify-between">
              <Iconify icon="solar:logout-2-outline" color="red" size={20} />
              <Text className="ml-2 text-lg text-red-500 font-aeonik">
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
