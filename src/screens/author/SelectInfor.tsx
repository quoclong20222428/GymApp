/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ChooseFocusArea } from '../PersonalInformation/index';


export function SelectInfor(): React.JSX.Element {
    return (
        // <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
        <SafeAreaView style={styles.container}>
            {/* <ScrollView contentContainerStyle={styles.container}> */}
            {/* <ChooseFocusArea /> */}
            {/* </ScrollView> */}

            {/* <View>
                <ChooseFocusArea />
            </View> */}

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ChooseFocusArea />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFF',
        alignItems: "center",
        flex: 1,
    },
});
