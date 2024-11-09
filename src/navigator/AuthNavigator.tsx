/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
    StyleSheet
} from 'react-native';
import { LoginScreen } from '../screens';


function AuthNavigator(): React.JSX.Element {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{headerShown: false}}>
            <Stack.Screen name='LoginScreen' component={LoginScreen}/>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default AuthNavigator;
