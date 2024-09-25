import React from 'react';
import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack";

import { ProfileScreen } from '../../features/profile/screens/profile.screen';

  const  ProfileStack = createStackNavigator();

export const ProfileNavigator = () => {
    return (
        <ProfileStack.Navigator
        headerMode="none"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}
        >
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
       />
        </ProfileStack.Navigator>
    )
}