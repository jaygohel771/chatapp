/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const tab = createBottomTabNavigator();
import { Image } from 'react-native';
import React from 'react';
import ChatListScreen from '../screens/Home/ChatListScreen';
import SettingScreen from '../screens/Home/SettingScreen';
import { img } from '../constant/Img';
import { vs } from 'react-native-size-matters';
import { Colors } from '../constant/Colors';
import { hs } from '../constant/Helper';

const TabNavigation = () => {
  return (
    <tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: '#0066ff',
        tabBarInactiveTintColor: 'gray',

        tabBarIcon: ({ color }) => {
          if (route.name === 'ChatListScreen') {
            return (
              <Image
                source={img.chat}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: color, // applies active/inactive color
                }}
              />
            );
          } else if (route.name === 'SettingScreen') {
            return (
              <Image
                source={img.setting}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: color,
                }}
              />
            );
          }
        },
        animation: 'fade',
        // tabBarBackground:,
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          marginHorizontal: hs(10),
          left: 20,
          right: 50,
          height: vs(55),
          borderRadius: 20,
          backgroundColor: 'rgba(255,255,255,0.9)', // glass feel
          shadowColor: Colors.CelticBlue,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          elevation: 12,
          paddingBottom: vs(5),
          paddingTop: vs(5),
        },
      })}
    >
      <tab.Screen name="ChatListScreen" component={ChatListScreen} />
      <tab.Screen name="SettingScreen" component={SettingScreen} />
    </tab.Navigator>
  );
};

export default TabNavigation;
