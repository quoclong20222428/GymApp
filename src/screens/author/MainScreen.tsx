/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

export default function MainScreen(props: any): React.JSX.Element {
    const { navigation } = props
    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
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


