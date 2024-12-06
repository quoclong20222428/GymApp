/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
    Image,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BtnColor } from "../../components";
import LoadingScreen from '../modals/LoadingScreen';

export default function AllSet(props: any): React.JSX.Element {
    const { navigation } = props

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../image/forgetpassword.png')} style={styles.icon} />
            <View style={styles.title}>
                <Text style={styles.titleText}>You’re All Set</Text>
            </View>

            <Text style={styles.h1}>Congratulations! Your password has been changed successfully. You can now continue your fitness journey.</Text>

            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={{ bottom: -300, width: 339 }} onPress={() => {
                    navigation.pop(4)
                }
                }>
                    <BtnColor name='Done' />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    backArrow: {
        width: 24,
        height: 24,
        marginTop: 20,
        // marginLeft: 16,
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'poppins',
        marginTop: 20,
        lineHeight: 45,
    },
    h1: {
        height: 'auto',
        width: 368,
        fontSize: 16,
        color: '#6E6666',
        lineHeight: 24,
        textAlign: 'center',
    },
    icon: {
        width: 184,
        height: 150,
        marginTop: 150,
    }
});