import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { AccountNavigator } from "./account.navigator";
import { AppNavigator } from "./app.navigator"; 
import Toast from 'react-native-toast-message';

export const Navigation = () => {
  const isAuthenticated = useSelector((state) => state.signUp.authenticated);
  const isBVNVerified = useSelector((state) => state.bvn.isBVNVerified);


  const shouldShowAppNavigator = isAuthenticated || isBVNVerified;

  return (
    <NavigationContainer>
      {shouldShowAppNavigator ? <AppNavigator /> : <AccountNavigator />}
      <Toast />
    </NavigationContainer>
  );
};
