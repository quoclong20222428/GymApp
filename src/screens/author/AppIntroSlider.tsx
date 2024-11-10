/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';


function AppIntroSlider(): React.JSX.Element {
    return (
        <View>
            <Text>AppIntro</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default AppIntroSlider;
