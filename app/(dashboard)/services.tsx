import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Wifi from "@/assets/images/services/wifi.svg";
import Phone from "@/assets/images/services/phone.svg";
import Radio from "@/assets/images/services/radio.svg";
import More from "@/assets/images/services/more.svg";
import Electricity from "@/assets/images/services/electricity.svg";
import Betting from "@/assets/images/services/betting.svg";

export default function services() {
  return (
    <SafeAreaView className="flex-1">
      <View
        style={{ borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}
        className="h-48 relative  bg-primary"
      >
        <Image
          source={require("@/assets/images/card-pattern.png")}
          className="absolute w-full opacity-30 h-full"
        />
        <View className="flex items-center justify-end p-3 h-full">
          <Text className="text-white text-base font-aeonik-bold">
            Services
          </Text>
        </View>
      </View>
      <View className="px-5 mt-3">
        <Text className="text-lg font-aeonik">Internet</Text>
        <View className="flex flex-row gap-3 mt-2">
          <TouchableOpacity className="flex items-center justify-center p-3 border border-gray-400 rounded-md">
            <Phone width={50} height={50} />
            <Text className="font-aeonik">Airtime</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex items-center justify-center p-3 border border-gray-400 rounded-md">
            <Wifi width={50} height={50} />
            <Text className="font-aeonik">Data</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-5 mt-3">
        <Text className="text-lg font-aeonik">Utilites</Text>
        <View className="flex flex-row gap-3 mt-2">
          <TouchableOpacity className="flex items-center justify-center p-3 border border-gray-400 rounded-md">
            <Radio width={50} height={50} />
            <Text className="font-aeonik">Cable TV</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex items-center justify-center p-3 border border-gray-400 rounded-md">
            <Betting width={50} height={50} />
            <Text className="font-aeonik">Betting</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex items-center justify-center p-3 border border-gray-400 rounded-md">
            <Electricity width={50} height={50} />
            <Text className="font-aeonik">Electricity</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
