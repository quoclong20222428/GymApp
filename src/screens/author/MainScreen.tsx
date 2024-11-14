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
    SafeAreaView,
    StyleSheet,
    Text,
    Touchable,
    TouchableOpacity
} from 'react-native';

export default function MainScreen(props: any): React.JSX.Element {
    const {navigation} = props
    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => {navigation.goBack()}}>
                <Text style={{ fontSize: 60 }}>MainScreen Return</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
});


