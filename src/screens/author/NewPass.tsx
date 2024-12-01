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

export default function NewPass(props: any): React.JSX.Element {
    const [pass, setPass] = useState<string>('')
    const [newPass, setNewPass] = useState<string>('')

    const [checkPass, setCheckPass] = useState<boolean>(true)
    const [isHidePass, setIsHidePass] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { navigation } = props

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 10000)
    })

    const handleLogin = () => {
        if (pass === newPass) {
            setIsLoading(true)
            if (!isLoading) {
                navigation.navigate('AllSet')
            }
        }
        else setCheckPass(false)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={() => {
                    navigation.pop(2)
                    }}>
                    <Image source={require('../../image/backArrow.png')} style={styles.backArrow} />
                </TouchableOpacity>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Secure Your Account</Text>
                    <Image source={require('../../image/noto_key.png')} style={styles.key} />
                </View>

                <Text style={styles.h1}>Almost there! Create a new password for your FitnestX account to keep it secure. Remember to choose a strong and unique password.</Text>


                <View style={{ paddingTop: 18, paddingLeft: 17 }}>

                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>New Password</Text>
                        <View style={[styles.inputBox, { flexDirection: 'row', alignItems: 'center' }]}>
                            <Image source={require('../../image/lockPass.png')} style={styles.icon} />
                            <TextInput value={pass} style={[{ flex: 1 }]}
                                secureTextEntry={isHidePass}
                                placeholder='Password'
                                placeholderTextColor={'#B7ACAC'}
                                onChangeText={pass => setPass(pass)} />
                            <TouchableOpacity onPress={() => setIsHidePass(!isHidePass)}>
                                {
                                    isHidePass ?
                                        <Image source={require('../../image/hidePass.png')} style={styles.hidePassIcon} resizeMode='contain' />
                                        :
                                        <Image source={require('../../image/Eye.png')} style={styles.unhidePassIcon} resizeMode='contain' />
                                }
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.input, { marginTop: 20 }]}>
                            <Text style={styles.inputLabel}>Confirm New Password</Text>
                            <View style={[styles.inputBox, { flexDirection: 'row', alignItems: 'center' }]}>
                                <Image source={require('../../image/lockPass.png')} style={styles.icon} />
                                <TextInput value={newPass} style={[{ flex: 1 }]}
                                    secureTextEntry={isHidePass}
                                    placeholder='Password'
                                    placeholderTextColor={'#B7ACAC'}
                                    onChangeText={pass => setNewPass(pass)} />
                                <TouchableOpacity onPress={() => setIsHidePass(!isHidePass)}>
                                    {
                                        isHidePass ?
                                            <Image source={require('../../image/hidePass.png')} style={styles.hidePassIcon} resizeMode='contain' />
                                            :
                                            <Image source={require('../../image/Eye.png')} style={styles.unhidePassIcon} resizeMode='contain' />
                                    }
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: 'red', marginTop: 5 }}>{!checkPass ? 'Passwords do not match' : ''}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={{ bottom: -300, width: 339 }} onPress={handleLogin}>
                        <BtnColor name='Save New Password' />
                    </TouchableOpacity>
                </View>


                {
                    isLoading && (
                        <LoadingScreen visible={isLoading} message='Reset Password...' style={styles.indicatorContainer} />
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
        backgroundColor: '#FFFFFF',
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
    hidePassIcon: {
        width: 13.89,
        height: 7.75,
        marginTop: 4.5,
        marginRight: 10,
    },
    unhidePassIcon: {
        width: 16,
        height: 16,
        marginTop: 4.5,
        marginRight: 10,
    },
    indicatorContainer: {
        position: 'absolute',
    },
});