import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import Toast from "react-native-toast-message";
import {
  Container,
  Header,
  HeaderText,
  SubHeaderText,
  Form,
  Input,
  ContinueButton,
  ContinueButtonText,
} from "@/components/account.styles";
import { useDispatch, useSelector } from "react-redux";
import { verifyBVN, setBvnInfo } from "@/redux/slices/bvnSlice/bvnSlice";
import { setSignUpInfo, signUp } from "@/redux/slices/authentication/authSlice";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { host } from "@/utils/env";

export default function SignUpTwoScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const bvnState = useSelector((state) => state.bvn);
  const token = useSelector((state) => state.signUp.token);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(bvnState.username || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFinish = async () => {
    const token = await AsyncStorage.getItem("token");
    setIsLoading(true);
    try {
      console.log("Token before BVN verification:", token);

      AsyncStorage.setItem("token", token);

      if (!token) {
        throw new Error("Token is not available");
      }
      dispatch(setBvnInfo({ bvn, username }));

      // Verify BVN
      const response = await axios.post(``, {});

      //console.log(response);

      if (response.statusCode) {
        Toast.show({
          type: "success",
          text1: "Sign Up Successful",
          text2: "You have successfully signed up!",
        });

        // Navigate to Home page
        router.push("/transaction_pin");
      } else {
        console.log(error.response);
        setErrorMessage(
          "BVN verification failed. Please check your BVN and try again."
        );
        Toast.show({
          type: "error",
          text1: "BVN Verification Failed",
          text2: "Please check your BVN and try again.",
        });
      }
    } catch (error) {
      console.log(error.response);
      setErrorMessage(
        error.message ||
          "An error occurred during BVN verification. Please try again."
      );
      Toast.show({
        type: "error",
        text1: "Error",
        text2:
          error.message ||
          "An error occurred during BVN verification. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header>
          <HeaderText>Forgot Password?</HeaderText>
          <SubHeaderText>
            Fill the details below and input your new password
          </SubHeaderText>
        </Header>
        <Form>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="rgba(196, 196, 196, 1)"
            className="p-2 h-full border-[0.5px] border-gray-400 mt-3 rounded-md flex-1 text-[rgba(196, 196, 196, 1)]"
          />
          {errorMessage ? (
            <Text style={{ color: "red", marginBottom: 10 }}>
              {errorMessage}
            </Text>
          ) : null}
          <TouchableOpacity
            className="flex flex-row items-center justify-center p-5 mt-5 bg-[#1F6CAB] rounded-full"
            onPress={handleFinish}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <ContinueButtonText>Continue</ContinueButtonText>
            )}
          </TouchableOpacity>
        </Form>
      </ScrollView>
      <Image
        source={require("@/assets/pattern.png")}
        className="absolute bottom-0"
      />
    </Container>
  );
}
