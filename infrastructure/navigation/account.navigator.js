import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {SplashScreens} from '../../features/account/screens/splash.screen';
import {OnboardingScreen} from '../../features/account/screens/onboarding.screen';
import {WelcomeScreen} from '../../features/account/screens/welcome.screen';
import {SignUpOneScreen} from '../../features/account/screens/signupone.screen';
import {SignUpTwoScreen} from '../../features/account/screens/signuptwo.screen';
import {OTPVerificationScreen} from '../../features/account/screens/otpverification.screen';
import {LoginScreen} from '../../features/account/screens/login.screen';
import {ReturningUserScreen} from '../../features/account/screens/returning.screen';

const Stack = createStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreens} />
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="SignUpOne" component={SignUpOneScreen} />
    <Stack.Screen name="SignUpTwo" component={SignUpTwoScreen} />
    <Stack.Screen name="Signin" component={LoginScreen} />
    <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
  </Stack.Navigator>
  );  