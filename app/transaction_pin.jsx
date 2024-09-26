import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Iconify } from "react-native-iconify";
import { router } from "expo-router";
import {
  OTPContainer,
  OTPInput,
  OtpBackground,
  WelcomeOverlay,
  MailCover,
  SubmitButton,
  SubmitButtonText,
  OTPHeaderText,
  OTPHeaderSubHeaderText,
  OTPFooterText,
  SupportContainer,
} from "@/components/account.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { host } from "@/utils/env";

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

  const [isLoading, setIsLoading] = useState(false);

  const [otp, setOTP] = useState(["", "", "", ""]); // Updated to 4 characters

  const handlePress = async () => {
    try {
      //console.log(otp.join(""));
      const token = await AsyncStorage.getItem("token");

      const myHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      setIsLoading(true);

      const otpString = Number(otp.join(""));

      const data = {
        pin: otpString,
      };

      const response = await axios.post(`${host}/transaction/pin`, data, {
        headers: myHeaders,
      });

      console.log(response.data);
      router.push("/home");
    } catch (error) {
      //router.push("/transaction_error");
      console.log(error);
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPChange = (value, index) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    if (value && index < 3) {
      const nextInput = `otp${index + 1}`;
      this[nextInput].focus();
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
            Reset Transaction Pin
          </Text>
        </View>
      </View>
      <View className="">
        <View className="p-5 bg-white">
          <View style={styles.contentContainer}>
            <View style={{ gap: 5 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Aeonik TRIAL",
                    fontSize: 20,
                    fontWeight: "700",
                    textAlign: "center",
                    //color: "rgba(31, 108, 171, 1)",
                  }}
                >
                  SET YOUR NEW 4-DIGIT TRANSACTION PIN
                </Text>
                {/* <TouchableOpacity onPress={props.onClose}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity> */}
              </View>
              <Text
                style={{
                  fontFamily: "Aeonik TRIAL",
                  fontSize: 14,
                  fontWeight: "400",
                  color: "rgba(144, 144, 144, 1)",
                }}
              >
                Ensure you re-enter your PIN correctly to complete the setup
              </Text>

              {/* <View style={{gap: 15}}> */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 25,
                  marginBottom: 20,
                }}
              >
                {[0, 1, 2, 3].map((_, index) => (
                  <OTPInput
                    key={index}
                    ref={(input) => (this[`otp${index}`] = input)}
                    value={otp[index]}
                    onChangeText={(value) => handleOTPChange(value, index)}
                    keyboardType="numeric"
                    maxLength={1}
                  />
                ))}
                {/* </View> */}
              </View>
              <TouchableOpacity style={styles.payButton} onPress={handlePress}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.payButtonText}>Confirm</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(196, 196, 196, 1)",
    borderRadius: 10,
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 10,
    height: 48,
  },
  input: {
    flex: 1,
    textAlign: "left",
    fontSize: 16,
  },
  currency: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  currencyText: {
    fontSize: 16,
    color: "#666",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: "white",
  },
  contentContainer: {
    padding: 20,
    // alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    borderTopLeftRadius: 50, // Increase this value for more rounded corners
    borderTopRightRadius: 50, // Increase this value for more rounded corners
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    paddingBottom: 20,
    color: "#fff",
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  passwordInput: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 24,
  },
  payButton: {
    backgroundColor: "rgba(31, 108, 171, 1)",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
    width: "100%",
    height: 48,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
