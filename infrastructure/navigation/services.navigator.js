import React from 'react';
import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack";

import { ServicesScreen } from '../../features/account/services/screens/services.screen';

const ServicesStack = createStackNavigator();

export const ServicesNavigator = () => {
    return (
        <ServicesStack.Navigator
        headerMode="none"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}
        >
    <ServicesStack.Screen
      name="Services"
      component={ServicesScreen}
       />
        </ServicesStack.Navigator>
    )
}