/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
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
import authenticationAPI from '../../apis/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addAuth } from '../../redux/authReducer';
import { useDispatch } from 'react-redux';
import LoadingScreen from '../modals/LoadingScreen';


export default function EnterOTP({ navigation, route }: any): React.JSX.Element {
    const dispatch = useDispatch();
    const { code, email, password, username, isForgotPassword } = route.params;
    const [countTime, setCountTime] = useState<number>(55)

    const [otp, setOtp] = useState(['', '', '', '']);
    const [currentCode, setCurrentCode] = useState<string>(code);
    const [isLoading, setIsLoading] = useState(false);
    const [noteLoading, setNoteLoading] = useState<string>('Verify...')
    const inputs = useRef<any>([]);

    useEffect(() => {
        if (countTime <= 0) {
            setCountTime(0)
            return
        }

        // Set up an interval to update the countdown every second
        const intervalId = setInterval(() => {
            setCountTime((prevTime) => prevTime - 1);
        }, 1000);

        // Clear the interval when component unmounts or timeLeft reaches 0
        return () => clearInterval(intervalId);
    }, [countTime]);

    const handleChange = (text: any, index: any) => {
        let newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Auto-focus next input
        if (text && index < 3) {
            inputs.current[index + 1].focus();
        }

        // Auto-submit when full
        if (newOtp.join('').length === 4) {
            // handleSubmit(newOtp.join(''));
            handleVerification(newOtp.join(''));
        }
    };
    //------------------------------------------------------------------
    const handleResendVerification = async () => {
        setOtp(['', '', '', '']);
        setNoteLoading('Resending OTP code...')
        // setNewCode('');

        const api = `/verification`;
        setIsLoading(true);
        try {
            const res: any = await authenticationAPI.HandleAuthentication(
                api,
                { email },
                'post',
            );

            setCountTime(55);
            setCurrentCode(res.data.code);
            setIsLoading(false);
            setNoteLoading('Verify...')

            console.log(res.data.code);
        } catch (error) {
            setIsLoading(false);
            console.log(`Can not send verification code ${error}`);
        }
    };

    const handleVerification = async (newCode: string) => {
        if (countTime > 0) {
            if (parseInt(newCode) === parseInt(currentCode)) {
                setIsLoading(true)
                if (isForgotPassword) {
                    setIsLoading(false)
                    navigation.navigate('NewPass')
                }
                else {
                    const api = `/register`;
                    const data = {
                        email,
                        password,
                        username: username ?? '',
                    };

                    try {
                        const res: any = await authenticationAPI.HandleAuthentication(
                            api,
                            data,
                            'post',
                        );
                        dispatch(addAuth(res.data));
                        await AsyncStorage.setItem('auth', JSON.stringify(res.data));
                        setIsLoading(false)
                        Alert.alert('Successed','User register successfully, you can use app right now!');
                        navigation.goBack()
                    } catch (error) {
                        setIsLoading(false)
                        Alert.alert('Warning','User has already exist!');
                        console.log(`Can not create new user ${error}`);
                    }
                }

                // const api = `/verification`;
                // const data = {
                //     username: username ?? '',
                //     email,
                //     password,
                // };

                // try {
                //     const res: any = await authenticationAPI.HandleAuthentication(
                //         api,
                //         data,
                //         'post',
                //     );
                //     dispatch(addAuth(res.data));
                //     await AsyncStorage.setItem('auth', JSON.stringify(res.data));
                //     setIsLoading(false)
                //     if (isForgotPassword === 1) handleResetPassword()
                //     else {
                //         // navigation.back()
                //         navigation.pop(2)
                //         navigation.navigate('SignInScreen')
                //     }
                // } catch (error) {
                //     // User has already exist!!!
                //     console.log(`Can not create new user ${error}`);
                // }
            }
        } else {
            setOtp(['', '', '', '']);
        }
    };

    const handleResetPassword = () => {
        // Replace with OTP verification logic
        // console.log('OTP entered:', otpCode);
        // Trigger your OTP verification function here
        navigation.navigate('NewPass')
        setCountTime(0)
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image source={require('../../image/backArrow.png')} style={styles.backArrow} />
                </TouchableOpacity>

                <View style={styles.title}>
                    <Text style={styles.titleText}>Enter OTP Code</Text>
                    <Image source={require('../../image/noto_key.png')} style={styles.key} />
                </View>

                <Text style={styles.h1}>Check your email inbox for the OTP code we sent you. Please enter it below to proceed with the password reset.</Text>
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <View style={styles.otpContainer}>
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                style={[
                                    styles.otpInput,
                                    otp.join('').length === 4 && parseInt(otp.join('')) !== parseInt(currentCode)
                                        ? styles.filledErrorInput
                                        : otp[index]
                                            ? styles.filledInput
                                            : null,
                                ]}
                                keyboardType="number-pad"
                                maxLength={1}
                                onChangeText={(text) => handleChange(text, index)}
                                ref={(input) => (inputs.current[index] = input)}
                            />
                        ))}
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.resendText}>You can resend the code in <Text style={{ fontWeight: 'bold' }}>{countTime}</Text> seconds</Text>
                    <TouchableOpacity style={styles.resendButton} onPress={handleResendVerification}>
                        <Text style={styles.resendButtonText}>Resend code</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'red', marginTop: 5 }}>
                        {
                            otp.join('').length === 4 && parseInt(otp.join('')) !== parseInt(currentCode)
                                ? "The OTP code is incorrectly!" :
                                (!countTime ? "Time out! Please resend your OTP code." : "")
                        }
                    </Text>
                </View>

                {/* <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={{ bottom: -420, width: 339 }}>
                        <BtnColor name='Confirm' />
                    </TouchableOpacity>
                </View> */}

                {
                    isLoading && (
                        <LoadingScreen visible={isLoading} message={noteLoading} style={styles.indicatorContainer} />
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

    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 20,
    },
    otpInput: {
        width: 60,
        height: 60,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        textAlign: 'center',
        fontSize: 24,
        color: '#333333',
    },
    filledInput: {
        borderColor: '#007BFF',
        borderWidth: 2,
        color: '##9DCEFF'
    },
    filledErrorInput: {
        borderColor: 'red',
        borderWidth: 2,
        color: '##9DCEFF'
    },
    resendText: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 10,
        textAlign: 'center',
    },
    resendButton: {
        paddingVertical: 10,
        width: 120,
    },
    resendButtonText: {
        fontSize: 16,
        color: '#007BFF',
        fontWeight: '600',
        textAlign: 'center',
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

