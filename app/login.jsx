import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Text,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Header,
  HeaderText,
  SubHeaderText,
  Form,
  Input,
  ContinueButton,
  ContinueButtonText,
  SocialButtons,
  SocialButton,
  SignupFooterText,
  SupportText,
  PasswordInputContainer,
  FooterText,
  LinkText,
  PasswordInput,
} from "../components/account.styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Apple from "@/assets/icons/Apple";
import Google from "@/assets/icons/Google";
import Support from "@/assets/icons/Support";
import { login } from "@/redux/slices/authentication/authSlice";
import Lock from "@/assets/icons/Lock";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const loginStatus = useSelector((state) => state.signUp.loginStatus);

  const handleLogin = async () => {
    const resultAction = await dispatch(login({ email, password }));

    if (login.fulfilled.match(resultAction)) {
      console.log("loggedin");
      Toast.show({ type: "success", text1: "Login Successful" });
      router.push("/home");
    } else {
      const errorMsg =
        resultAction.payload || "Failed to login. Please try again.";
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: errorMsg.message,
        position: "top",
      });
    }
  };

  return (
    <Container>
      <Header>
        <HeaderText>Log In</HeaderText>
        <SubHeaderText>
          Fill the details below to login to your account
        </SubHeaderText>
      </Header>
      <Form>
        {errorMessage ? <Text>{errorMessage}</Text> : null}
        <Input
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <View
          className="flex flex-row items-center mt-3"
          style={{
            borderColor: "rgba(196, 196, 196, 1)",
            borderRadius: 10,
            borderWidth: 0.5,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <Lock />
          <PasswordInput
            style={{ flex: 1, height: "100%" }}
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          <FontAwesome
            name={isPasswordVisible ? "eye-slash" : "eye"}
            size={20}
            color="rgba(196, 196, 196, 1)"
            onPress={() => setPasswordVisibility(!isPasswordVisible)}
            style={{ marginLeft: 10 }}
          />
        </View>
        <TouchableOpacity
          className="flex flex-row items-center justify-center p-5 mt-5 bg-[#1F6CAB] rounded-full"
          onPress={handleLogin}
        >
          {loginStatus === "loading" ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <ContinueButtonText>Sign In</ContinueButtonText>
          )}
        </TouchableOpacity>

        {/* <ContinueButton
          className="flex flex-row items-center p-3 rounded-full"
          onPress={handleLogin}
        >

        </ContinueButton> */}
      </Form>
    </Container>
  );
}
