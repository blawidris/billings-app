import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import { AccountBackground, Logo, Title } from "../components/account.styles";

export default function SplashScreens() {
  // useEffect(() => {
  //     setTimeout(() => {
  //         SplashScreen?.hide();
  //         navigation.replace('Onboarding');
  //       }, 5000);
  // }, [navigation])

  return (
    <AccountBackground>
      <Title>PAY BILLS</Title>
    </AccountBackground>
  );
}
