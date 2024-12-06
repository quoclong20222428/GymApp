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
import { Validate } from '../../utils/validate';
import authenticationAPI from '../../apis/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../modals/LoadingScreen';

const initValue = {
    name: '',
    email: '',
    password: '',
}

export default function ForgotPassScreen(props: any): React.JSX.Element {
    const { navigation } = props

    const [reqEmail, setReqEmail] = useState(false)
    const [checkMail, setCheckMail] = useState<boolean>(true)
    const [values, setValues] = useState(initValue)
    const [isLoading, setIsLoading] = useState(false)

    const handleChangeValue = (key: string, value: string) => {
        const data: any = { ...values }

        data[`${key}`] = value

        setValues(data)
    }

    const checkFormat = () => {
        if (!values.email) setReqEmail(true)
        else {
            setReqEmail(false)
            setCheckMail(Validate.email(values.email))
        }
        if(!reqEmail && checkMail) return true
        else return false
    }

    const handleOTP = async () => {
        if (checkFormat()) {
            setIsLoading(true)
                const api = `/verification`
                try {
                    const res = await authenticationAPI.HandleAuthentication(
                        api,
                        {email: values.email},
                        'post'
                    );

                    setIsLoading(false);
                    console.log(res)
                    console.log('This is forgot password!')

                    navigation.navigate('EnterOTP', {
                        code: res.data.code,
                        isForgotPassword: 1,
                        ...values,
                      });

                } catch (error) {

                }
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
                                value={values.email}
                                style={[{ flex: 1 }]}
                                placeholder="Email"
                                keyboardType="email-address"
                                placeholderTextColor="#B7ACAC"
                                autoCapitalize='none'
                                onChangeText={email => handleChangeValue('email', email)}
                            />
                        </View>

                        <Text style={{ color: 'red', marginTop: 5 }}>{reqEmail ? 'Email is required!' : (checkMail ? '' : 'Email is not invalid!')}</Text>
                    </View>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={{ bottom: -420, width: 339 }} onPress={handleOTP}>
                        <BtnColor name='Send OTP code' />
                    </TouchableOpacity>
                </View>

                {
                    isLoading && (
                        <LoadingScreen visible={isLoading} message='Sending OTP Code...' style={styles.indicatorContainer} />
                    )
                }

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
    indicatorContainer: {
        position: 'absolute',
    },
});

