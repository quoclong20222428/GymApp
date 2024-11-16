/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
    Image,
    Keyboard,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { BtnColor } from "../../components";

export default function ForgotPassScreen(props: any): React.JSX.Element {
    const { navigation } = props
    const [email, setEmail] = useState<string>('')

    const [checkMail, setCheckMail] = useState<boolean>(true)


    const checkFormat = () => {
        let data = {
            _email: email,
        }
        let regexEmail = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )

        let result = (regexEmail.test(data._email))

        if (!result) {
            setCheckMail(false)
        } else {
            setCheckMail(true)
        }

        return result
    }

    const handleOTP = () => {
        if (checkFormat()) {
            navigation.navigate('EnterOTP')
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image source={require('../../image/backArrow.png')} style={styles.backArrow} />
                </TouchableOpacity>

                <View style={styles.title}>
                    <Text style={styles.titleText}>Reset Your Password</Text>
                    <Image source={require('../../image/noto_key.png')} style={styles.key} />
                </View>

                <Text style={styles.h1}>No worries! We’ll help you reset your password.{'\n'}
                    Enter your registered email, and we’ll send you an OTP code to verify your identity.</Text>


                <View style={{ paddingTop: 18, paddingLeft: 17 }}>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Email</Text>


                        <View style={[styles.inputBox, { flexDirection: 'row', alignItems: 'center' }]}>
                            <Image source={require('../../image/Email.png')} style={styles.icon} />
                            <TextInput
                                value={email}
                                style={[{ flex: 1 }]}
                                placeholder="Email"
                                keyboardType="email-address"
                                placeholderTextColor="#B7ACAC"
                                onChangeText={email => setEmail(email)}
                            />
                        </View>

                        <Text style={{ color: 'red', marginTop: 5 }}>{!checkMail ? 'Wrong Email format' : ''}</Text>
                    </View>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={{ bottom: -420, width: 339 }} onPress={handleOTP}>
                        <BtnColor name='Send OTP code' />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#FFFFFF',
    },
    backArrow: {
        width: 24,
        height: 24,
        marginTop: 20,
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
    key: {
        height: 42,
        width: 42,
        marginLeft: 10,
        marginTop: 22,
    },
    h1: {
        height: 'auto',
        width: 368,
        fontSize: 16,
        color: '#6E6666',
        alignContent: 'center',
        lineHeight: 24,
    },

    input: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 16,
        color: '#222',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    inputBox: {
        // borderWidth: 1,
        backgroundColor: '#F5F5F5',
        color: '#222',
        paddingHorizontal: 10,
        borderRadius: 12,
        fontWeight: '500',
        width: 350,
        height: 52,
    },
    formAction: {
        marginVertical: 24,
    },
    btn: {
        backgroundColor: '#0054a6',
        borderRadius: 8,
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 17,
    },

    btnText: {
        color: '#fff',
        fontSize: 25,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
});

