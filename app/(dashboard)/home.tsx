import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Iconify } from "react-native-iconify";

export default function home() {
  return (
    <SafeAreaView className="flex-1 h-full bg-white">
      <View className="flex p-5 items-center  flex-row justify-between">
        <View className=" flex flex-row items-center">
          <View>
            <Image
              className="h-10 rounded-full w-10"
              source={{
                uri: "https://images.unsplash.com/photo-1698745219621-b343bbd31637?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
            />
          </View>
          <View className="ml-2">
            <Text className="text-[#555555] font-raleway-semibold text-sm font-semibold">
              Hello Dev
            </Text>
            <Text className="font-raleway-medium font-normal text-[#909090] text-xs">
              What bills are you paying today?
            </Text>
          </View>
        </View>
        <TouchableOpacity className="border-[0.5px] p-2 border-[#1F6CAB] rounded-full">
          <Iconify icon="solar:bell-bing-outline" size={20} color="#1F6CAB" />
        </TouchableOpacity>
      </View>
      <View className="p-5">
        <View className="bg-primary h-auto w-full rounded-xl relative">
          <Image
            source={require("@/assets/images/card-pattern.png")}
            className="w-full h-full absolute"
          />
          <View className="flex flex-col p-5 items-center">
            <Text className="font-aeonik text-white text-base">Balance</Text>
            <Text className="font-aeonik-bold text-white text-4xl">50,000</Text>
            <View className="flex flex-row mt-3">
              <View
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                className="mr-1 p-2 rounded-full items-center flex flex-row"
              >
                <Text className="text-white mr-1 font-aeonik text-sm">
                  PB ID: @st_emmanuel
                </Text>
                <Image
                  source={require("@/assets/images/clipboard.png")}
                  className="w-[10px] ml-1 h-[10px] "
                />
              </View>
              <View
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                className="mr-1 p-2 rounded-full items-center flex flex-row"
              >
                <Text className="text-white mr-1 font-aeonik text-sm">
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
        <Image
          source={require("@/assets/images/card-pattern.png")}
          className="w-[20px] h-[20px]"
        />
      </View>
    </SafeAreaView>
  );
}
