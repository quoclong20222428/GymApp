/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
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
import BtnColor from './BtnColor';

export default function EnterOTP(props: any): React.JSX.Element {
    const { navigation } = props
    const [countTime, setCountTime] = useState<number>(55)

    const [otp, setOtp] = useState(['', '', '', '']);
    const inputs = useRef<any>([]);

    useEffect(() => {
        if (countTime <= 0){
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
            handleSubmit(newOtp.join(''));
        }
    };

    const handleSubmit = (otpCode: string) => {
        // Replace with OTP verification logic
        // console.log('OTP entered:', otpCode);
        // Trigger your OTP verification function here
        // navigation.navigate('NewPass')
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
                                style={[styles.otpInput, otp[index] ? styles.filledInput : null]}
                                keyboardType="number-pad"
                                maxLength={1}
                                onChangeText={(text) => handleChange(text, index)}
                                ref={(input) => (inputs.current[index] = input)}
                            />
                        ))}
                    </View>
                </View>

                <Text style={styles.resendText}>You can resend the code in <Text style={{ fontWeight: 'bold' }}>{countTime}</Text> seconds</Text>
                <TouchableOpacity style={styles.resendButton}>
                    <Text style={styles.resendButtonText}>Resend code</Text>
                </TouchableOpacity>

                {/* <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={{ bottom: -420, width: 339 }}>
                        <BtnColor name='Confirm' />
                    </TouchableOpacity>
                </View> */}
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
    resendText: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 10,
        textAlign: 'center',
    },
    resendButton: {
        paddingVertical: 10,
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
});

