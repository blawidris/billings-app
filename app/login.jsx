import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Text,
  Image,
  TextInput,
  BackHandler,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Header,
  HeaderText,
  SubHeaderText,
  Form,
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
import { Input } from "../components/common.styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Apple from "@/assets/icons/Apple";
import Google from "@/assets/icons/Google";
import Support from "@/assets/icons/Support";
import { login } from "@/redux/slices/authentication/authSlice";
import Lock from "@/assets/icons/Lock";
import Toast from "react-native-toast-message";
import { Link, router } from "expo-router";
import OrDivider from "@/utils/OrDivider";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  isSuccessResponse,
  isErrorWithCode,
} from "@react-native-google-signin/google-signin";
import { Iconify } from "react-native-iconify";
import * as LocalAuthentication from "expo-local-authentication";
import useBackPressHandler from "@/hooks/useBackHandler";

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
      console.log(errorMsg);
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: errorMsg.message,
        position: "top",
      });
    }
  };

  useBackPressHandler(["/login", "/(dashboard)/home"]);

  const fingerPrintLogin = async () => {
    try {
      LocalAuthentication.authenticateAsync();
    } catch (error) {}
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        console.log({ userInfo: response.data });
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        console.log(error);
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  useEffect(() => {}, [router]);

  return (
    <Container>
      <Header>
        <HeaderText>Login</HeaderText>
        <SubHeaderText>
          Fill the details below to login to your account
        </SubHeaderText>
      </Header>
      <Form>
        {errorMessage ? <Text>{errorMessage}</Text> : null}
        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="rgba(196, 196, 196, 1)"
          keyboardType="email-address"
          className="h-12 rounded-md border-[0.5px] p-2 mt-1 border-gray-400 text-[rgba(196, 196, 196, 1)]"
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
          <TextInput
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="rgba(196, 196, 196, 1)"
            secureTextEntry={!isPasswordVisible}
            className="p-2 h-full flex-1 text-[rgba(196, 196, 196, 1)]"
          />
          <FontAwesome
            name={isPasswordVisible ? "eye-slash" : "eye"}
            size={20}
            color="rgba(196, 196, 196, 1)"
            onPress={() => setPasswordVisibility(!isPasswordVisible)}
            style={{ marginLeft: 10 }}
          />
        </View>
        <View className="flex items-end p-2">
          <Link href="/forgot-password" className="text-primary">
            Forgot Password?
          </Link>
        </View>

        <TouchableOpacity
          className="flex flex-row items-center justify-center p-5 mt-5 bg-[#1F6CAB] rounded-full"
          onPress={handleLogin}
        >
          {loginStatus === "loading" ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <ContinueButtonText>Login</ContinueButtonText>
          )}
        </TouchableOpacity>
      </Form>
      <View className="flex items-center p-4 mt-4">
        <TouchableOpacity
          onPress={fingerPrintLogin}
          className="flex flex-row gap-2"
        >
          <Iconify icon="ri:fingerprint-fill" size={20} color="#1F6CAB" />
          <Text>Sign in with Biometrics</Text>
        </TouchableOpacity>
      </View>
      <View
        styles={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <OrDivider />
      </View>
      <SocialButtons>
        <SocialButton onPress={signIn}>
          <Google />
        </SocialButton>
        <SocialButton>
          <Apple />
        </SocialButton>
      </SocialButtons>
      <SignupFooterText>
        Don't have an account?
        <Link href="/register" className="text-primary">
          Sign up
        </Link>
      </SignupFooterText>
      {/* <Support /> */}
      <SupportText>Chat with support</SupportText>
      <Image
        source={require("@/assets/pattern.png")}
        className="absolute bottom-0"
      />
    </Container>
  );
}
