import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignUpScreen from '../screens/SignupAndLogin/SignUpScreen';
import LoginScreen from '../screens/SignupAndLogin/LoginScreen';
import TabNavigation from './TabNavigation';
import ChatScreen from '../screens/Home/ChatScreen';
import ChatListScreen from '../screens/Home/ChatListScreen';
import SplashScreen from '../screens/Home/SplashScreen';

export type RootStackParamList = {
  SignUpScreen: undefined;
  LoginScreen: undefined;
  BottamTab: undefined;
  ChatScreen: {
    currentUserId: any;
    otherUserId: any;
    otherUserName: any;
    otherUserEmail: any;
  };
  ChatListScreen: undefined;
  SplashScreen: undefined;
};

const stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
      >
        <stack.Screen name="SplashScreen" component={SplashScreen} />

        <stack.Screen name="BottamTab" component={TabNavigation} />
        <stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <stack.Screen name="ChatScreen" component={ChatScreen} />
        <stack.Screen name="ChatListScreen" component={ChatListScreen} />
        <stack.Screen name="LoginScreen" component={LoginScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
