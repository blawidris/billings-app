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
            <Image source={require("@/assets/Mail.png")} />
          </MailCover>
          <OTPHeaderText>Email Verification</OTPHeaderText>
          <OTPHeaderSubHeaderText>
            Enter the verification code sent to your registered email address
            and phone number
          </OTPHeaderSubHeaderText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 16,
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
          </View>
          <OTPFooterText>
            Didn’t receive OTP, resend in: 0:{timer < 10 ? `0${timer}` : timer}
          </OTPFooterText>
          <TouchableOpacity disabled={timer !== 0} onPress={handleResendOTP}>
            <Text style={{ color: timer === 0 ? "blue" : "grey" }}>
              Resend OTP
            </Text>
          </TouchableOpacity>
          <SubmitButton onPress={handleSubmitOTP}>
            {isLoading ? (
              <ActivityIndicator size="small" color="black" />
            ) : (
              <SubmitButtonText>Submit</SubmitButtonText>
            )}
          </SubmitButton>
        </OTPContainer>
        <SupportContainer>
          <Support />
        </SupportContainer>
      </ScrollView>
    </OtpBackground>
  );
}
