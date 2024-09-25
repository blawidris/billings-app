import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { HomeScreen } from "../../features/home/screens/home.screen";
import {AddMoneyOptionsScreen} from "../../features/home/screens/addmoney.screen"
import { EnterAmountScreen } from "../../features/home/screens/enter-amount.screen";
import { CardScreen } from "../../features/home/screens/card.screen";
import { TransactionsScreen } from "../../features/home/screens/transactions.screen";
import { BuyAirtimeScreen } from "../../features/home/screens/buy-airtime.screen";
import { PhoneBookScreen } from "../../features/home/screens/phonebook.screen";
import { BeneficiaryScreen } from "../../features/home/screens/beneficiary.screen";
import { TransactionSuccessScreen } from "../../features/home/screens/transaction-success.screen";
import { TransactionErrorScreen } from "../../features/home/screens/transaction-error.screen";
import { TransactionInsufficientScreen } from "../../features/home/screens/transaction-insufficient.screen";
import { TransactionReceiptScreen } from "../../features/home/screens/transaction-receipt.screen";

const HomeStack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
    headerMode="none"
      // screenOptions={{
      //   ...TransitionPresets.ModalPresentationIOS,
      // }}
      >
      <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      />
      <HomeStack.Screen
        name="Add"
        component={AddMoneyOptionsScreen}
      />
      <HomeStack.Screen
        name="Enter"
        component={EnterAmountScreen}
      />
      <HomeStack.Screen
        name="Card"
        component={CardScreen}
      />
      <HomeStack.Screen
        name="Transaction"
        component={TransactionsScreen}
      />
       <HomeStack.Screen
        name="Airtime"
        component={BuyAirtimeScreen}
      />
      <HomeStack.Screen
        name="PhoneBook"
        component={PhoneBookScreen}
      />
      <HomeStack.Screen
        name="Beneficiary"
        component={BeneficiaryScreen}
      />
      <HomeStack.Screen
        name="Success"
        component={TransactionSuccessScreen}
      />
      <HomeStack.Screen
        name="Error"
        component={TransactionErrorScreen}
      />
      <HomeStack.Screen
        name="Insufficient"
        component={TransactionInsufficientScreen}
      />
      <HomeStack.Screen
        name="Receipt"
        component={TransactionReceiptScreen}
      />
    </HomeStack.Navigator>
  )
}