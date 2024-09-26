import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
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
} from "../components/account.styles";
import { useDispatch, useSelector } from "react-redux";
import { verifyBVN, setBvnInfo } from "@/redux/slices/bvnSlice/bvnSlice";
import { setSignUpInfo, signUp } from "@/redux/slices/authentication/authSlice";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUpTwoScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const bvnState = useSelector((state) => state.bvn);
  const token = useSelector((state) => state.signUp.token);

  const [bvn, setBvn] = useState(bvnState.bvn || "");
  const [username, setUsername] = useState(bvnState.username || "");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFinish = async () => {
    try {
      console.log("Token before BVN verification:", token);

      AsyncStorage.setItem("token", token);

      if (!token) {
        throw new Error("Token is not available");
      }
      dispatch(setBvnInfo({ bvn, username }));

      // Verify BVN
      const response = await dispatch(verifyBVN({ bvn, username })).unwrap();
      console.log("BVN Verification Response:", response);

      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Sign Up Successful",
          text2: "You have successfully signed up!",
        });

        // Navigate to Home page
        router.push("/transaction_pin");
      } else {
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
    }
  };

  return (
    <Container>
      <Header>
        <HeaderText>Sign Up</HeaderText>
        <SubHeaderText>
          Kindly provide your BVN / NIN as a CBN requirement before you can have
          an account on PayBills
        </SubHeaderText>
      </Header>
      <Form>
        <Input
          placeholder="Enter BVN"
          keyboardType="numeric"
          value={bvn}
          onChangeText={setBvn}
          maxLength={11}
        />
        {errorMessage ? (
          <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
        ) : null}
        <Input
          placeholder="Enter username"
          value={username}
          onChangeText={setUsername}
        />
        <ContinueButton onPress={handleFinish}>
          <ContinueButtonText>Continue</ContinueButtonText>
        </ContinueButton>
      </Form>
    </Container>
  );
}
