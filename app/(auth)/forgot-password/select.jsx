import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
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
import Support from "@/assets/icons/Support";
import {
  verifyOTP,
  loginSuccess,
  sendOTP,
} from "@/redux/slices/authentication/authSlice";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { Iconify } from "react-native-iconify";

export default function OTPVerificationScreen({ navigation }) {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.signUp.email);
  const reference = useSelector((state) => state.signUp.reference);
  const [otp, setOTP] = useState(["", "", "", ""]); // Updated to 4 characters
  const [timer, setTimer] = useState(59);
  const isOTPSuccessful = useSelector((state) => state.signUp.isOTPSuccessful);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let interval = null;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (isOTPSuccessful) {
      dispatch(loginSuccess({ email }));
      router.push("/register2");
    }
  }, [isOTPSuccessful, dispatch, navigation]);

  const handleOTPChange = (value, index) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    if (value && index < 3) {
      const nextInput = `otp${index + 1}`;
      this[nextInput].focus();
    }
  };

  const handleSubmitOTP = async () => {
    const otpCode = otp.join("");
    console.log("Submitting OTP:", otpCode);
    console.log("Reference:", reference);

    setIsLoading(true);

    try {
      if (otpCode.length === 4) {
        await dispatch(verifyOTP({ code: otpCode, reference }))
          .unwrap()
          .then((response) => {
            console.log("OTP Verification Response:", response); // Debugging log
          });
      } else {
        Toast.show({
          type: "error",
          text1: "Invalid OTP",
          text2: "Please enter a valid 4-digit OTP.",
        });
      }
    } catch (error) {
      console.error("OTP Verification Error:", error); // Debugging log
      Toast.show({
        type: "error",
        text1: "Verification Failed",
        text2: "Incorrect verification code or reference",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
    setTimer(59);
    dispatch(sendOTP(email)).then(() => {
      Toast.show({
        type: "success",
        text1: "OTP Sent",
        text2: "A new OTP has been sent to your email.",
      });
    });
  };

  return (
    <OtpBackground>
      <WelcomeOverlay />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <OTPContainer>
          <MailCover>
            <Image source={require("@/assets/key.png")} />
          </MailCover>
          <OTPHeaderText>Forgot Password?</OTPHeaderText>
          <OTPHeaderSubHeaderText>
            Don't worry! it happens. Lets help you retrieve your password.
          </OTPHeaderSubHeaderText>
          <View className="gap-4 mt-5">
            <TouchableOpacity className="flex flex-row items-center justify-between gap-2">
              <Image source={require("@/assets/ftext.png")} />
              <View>
                <Text className="text-base text-white font-aeonik">
                  Receive Code Via Text Message
                </Text>
                <Text className="text-sm text-white font-aeonik">
                  **** **** **** 6686
                </Text>
              </View>
              <Iconify icon="mdi:chevron-right" color="white" size={40} />
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row items-center justify-between gap-2">
              <Image source={require("@/assets/fmail.png")} />
              <View>
                <Text className="text-base text-white font-aeonik">
                  Receive Code Via Email Address
                </Text>
                <Text className="text-sm text-white font-aeonik">
                  Emmanuel******@gmail.com
                </Text>
              </View>
              <Iconify icon="mdi:chevron-right" color="white" size={40} />
            </TouchableOpacity>
          </View>

          <SubmitButton onPress={() => router.back()}>
            <SubmitButtonText>Go Back</SubmitButtonText>
          </SubmitButton>
        </OTPContainer>
        <SupportContainer>
          <Support />
        </SupportContainer>
      </ScrollView>
    </OtpBackground>
  );
}
