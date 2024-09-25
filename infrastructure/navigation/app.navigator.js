import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View, Text, Modal  } from "react-native";
import { HomeNavigator } from "./home.navigator";
import { ProfileNavigator } from "./profile.navigator";
import { ServicesNavigator } from "./services.navigator";

const Tab = createBottomTabNavigator();

export const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarLabel: () => null, // Disable the default label to prevent the second text from appearing
      tabBarIcon: ({ focused }) => {
        let iconSource;
        let label;
        let tintColor = focused ? '#1F6CAB' : '#828282'; // Inactive gray color similar to screenshot

        // Set icons and labels based on route
        if (route.name === 'Home') {
          iconSource = focused
            ? require('../../../assets/home-active.png')
            : require('../../../assets/home.png');
          label = 'Home';
        } else if (route.name === 'Services') {
          iconSource = focused
            ? require('../../../assets/services-active.png')
            : require('../../../assets/services.png');
          label = 'Services';
        } else if (route.name === 'Profile') {
          iconSource = focused
            ? require('../../../assets/profile-active.png')
            : require('../../../assets/profile.png');
          label = 'Profile';
        }

        return (
          <View style={{ alignItems: 'center', position: 'absolute', justifyContent: 'center', paddingBottom: 5 }}>
            <Image source={iconSource} style={{ width: 26, height: 26 }} />
            <Text
              style={{
                color: tintColor,
                fontSize: 10, // Smaller font size like in the screenshot
                marginTop: 3, // Small gap between icon and text
                fontWeight: 'bold'
              }}
            >
              {label}
            </Text>
          </View>
        );
      },
      tabBarStyle: {
        height: 100, // Increased height like in the screenshot
        paddingBottom: 10, // Padding to lift the content a bit
        backgroundColor: 'white',
        borderTopLeftRadius: 20, // Rounded corners at the top
        borderTopRightRadius: 20,
        borderTopWidth: 0, // Remove top border
        shadowColor: '#000', // Add shadow to match the soft elevated look
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10, // For Android shadow
      },
      tabBarActiveTintColor: '#1F6CAB',
      tabBarInactiveTintColor: '#828282', // Subtle gray like in screenshot
    })}
  >
    <Tab.Screen name="Home" component={HomeNavigator} />
    <Tab.Screen name="Services" component={ServicesNavigator} />
    <Tab.Screen name="Profile" component={ProfileNavigator} />
  </Tab.Navigator>
);
