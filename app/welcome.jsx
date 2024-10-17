import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  WelcomeBackground,
  WelcomeOverlay,
  WelcomeContainer,
  SignUpButton,
  SignInButton,
  SignUpText,
  SignInText,
  SupportContainer,
} from "../components/account.styles";
import Support from "@/assets/icons/Support";
import { router } from "expo-router";
import { Image } from "react-native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <WelcomeBackground>
      <WelcomeOverlay />
      <WelcomeContainer>
        <SignUpButton onPress={() => router.push("/register")}>
          <SignUpText>Sign Up</SignUpText>
        </SignUpButton>
        <SignInButton onPress={() => router.push("/login")}>
          <SignInText>Login</SignInText>
        </SignInButton>
      </WelcomeContainer>
      <SupportContainer>
        <Support />
      </SupportContainer>
      <Image
        style={{ zIndex: 20 }}
        source={require("@/assets/pattern.png")}
        className="absolute bottom-0"
      />
    </WelcomeBackground>
  );
}
