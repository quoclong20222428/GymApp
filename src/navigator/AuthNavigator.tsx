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

function AuthNavigator(): React.JSX.Element {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="OnboardScreen" component={OnboardScreen} />
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
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
