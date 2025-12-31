import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import MyBooks from '../screens/MyBooks';


export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  MyBooks: { type: 'readBooks' | 'wishBooks' };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MyBooks" component={MyBooks} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}