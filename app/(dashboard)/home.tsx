import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Iconify } from "react-native-iconify";
import Wifi from "@/assets/images/services/wifi.svg";
import Phone from "@/assets/images/services/phone.svg";
import Radio from "@/assets/images/services/radio.svg";
import More from "@/assets/images/services/more.svg";

export default function home() {
  return (
    <SafeAreaView className="flex-1 h-full bg-white">
      <View className="flex flex-row items-center justify-between p-5">
        <View className="flex flex-row items-center ">
          <View>
            <Image
              className="w-10 h-10 rounded-full"
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
        <View className="relative w-full h-auto bg-primary rounded-2xl">
          <Image
            source={require("@/assets/images/card-pattern.png")}
            className="absolute opacity-20 w-full h-full"
          />
          <View className="flex flex-col items-center p-5">
            <Text className="text-base text-white font-aeonik">Balance</Text>
            <Text className="text-4xl text-white font-aeonik-bold">
              ₦50,000
            </Text>
            <View className="flex flex-row mt-3">
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
            <View className="flex flex-row gap-4 mt-5">
              <View className="items-center gap-2">
                <TouchableOpacity
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                  className="flex items-center justify-center p-2 rounded-full w-14 h-14"
                >
                  <Iconify icon="mingcute:add-line" size={30} color="white" />
                </TouchableOpacity>
                <Text className="text-base text-white font-aeonik">Add</Text>
              </View>

              <View className="items-center gap-2">
                <TouchableOpacity
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                  className="flex items-center justify-center p-2 rounded-full w-14 h-14"
                >
                  <Iconify icon="mingcute:send-line" size={30} color="white" />
                </TouchableOpacity>
                <Text className="text-base text-white font-aeonik">Send</Text>
              </View>

              <View className="items-center gap-2">
                <TouchableOpacity
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                  className="flex items-center justify-center p-2 rounded-full w-14 h-14"
                >
                  <Iconify
                    icon="octicon:checklist-24"
                    size={30}
                    color="white"
                  />
                </TouchableOpacity>
                <Text className="text-base text-white font-aeonik">Bills</Text>
              </View>

              <View className="items-center gap-2">
                <TouchableOpacity
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                  className="flex items-center justify-center p-2 rounded-full w-14 h-14"
                >
                  <Iconify icon="uil:calendar-alt" size={30} color="white" />
                </TouchableOpacity>
                <Text className="text-base text-white font-aeonik">
                  Schedule
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Image
          source={require("@/assets/images/card-pattern.png")}
          className="w-[20px] h-[20px]"
        />
      </View>

      {/**Services */}
      <View className="px-5">
        <Text className="text-lg font-aeonik">Services</Text>
        <View className="flex flex-row gap-3 mt-2">
          <TouchableOpacity className="flex items-center justify-center p-3 border border-gray-400 rounded-md">
            <Phone width={50} height={50} />
            <Text className="font-aeonik">Airtime</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex items-center justify-center p-3 border border-gray-400 rounded-md">
            <Wifi width={50} height={50} />
            <Text className="font-aeonik">Data</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex items-center justify-center p-3 border border-gray-400 rounded-md">
            <Radio width={50} height={50} />
            <Text className="font-aeonik">Cable Tv</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex items-center justify-center p-3 border border-gray-400 rounded-md">
            <More width={50} height={50} />
            <Text className="font-aeonik">More</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/**Upcoming Payments */}
      <View className="px-5 mt-3">
        <View className="flex flex-row justify-between">
          <Text className="text-lg font-aeonik">Upcoming Payments</Text>

          <TouchableOpacity>
            <Text className="text-gray-400">See all</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-2">
          <View className="bg-white p-3 rounded-lg">
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center">
                <Image
                  className="h-10 w-10 mr-1"
                  source={require("@/assets/images/mtn.png")}
                />
                <View className="ml-1">
                  <Text className="font-aeonik text-sm">Airtime Recharge</Text>
                  <Text className="font-aeonik-bold text-[#253B4B] text-sm">
                    ₦700,000
                  </Text>
                </View>
              </View>

              <TouchableOpacity className="bg-primary p-2 px-3 rounded-full">
                <Text className="font-aeonik-bold text-white text-sm">
                  Pay Now
                </Text>
              </TouchableOpacity>
            </View>
            <View className="border-t mt-2 p-2 border-[#c4c4c4] flex flex-row justify-between items-center">
              <View className="flex flex-row space-x-3">
                <Iconify icon="bi:clock" size={16} color="#253B4B" />
                <Text className="text-[#253B4B] ml-2">
                  Next due date- 4 days
                </Text>
              </View>
              <View className="flex flex-row space-x-3">
                <Iconify icon="uil:calendar-alt" size={16} color="#253B4B" />
                <Text className="text-[#253B4B] ml-2">Monthly</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/**Recent Transactions */}
      <View className="px-5 mt-3">
        <View className="flex flex-row justify-between">
          <Text className="text-lg font-aeonik">Recent Transactions</Text>

          <TouchableOpacity>
            <Text className="text-gray-400">See all</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text className="text-gray-400">Today</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
