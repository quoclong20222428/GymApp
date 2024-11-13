/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
    StyleSheet
} from 'react-native';
import OnboardScreen from '../screens/author/OnboardScreen';
import LoginScreen from '../screens/author/LoginScreen';
import SignInScreen from '../screens/author/SignInScreen';
import SignUpScreen from '../screens/author/SignUpScreen';

type RootStackParamList = {
  OnboardScreen: undefined;
  LoginScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthNavigator(): React.JSX.Element {
    return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="OnboardScreen" component={OnboardScreen} />
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='SignInScreen' component={SignInScreen} />
            <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
});

export default AuthNavigator;
