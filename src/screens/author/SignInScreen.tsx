/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import {
  Alert,
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
import { useDispatch } from 'react-redux';
import authenticationAPI from '../../apis/authApi';
import { BtnColor } from "../../components";
import { addAuth } from '../../redux/authReducer';
import { Validate } from '../../utils/validate';
import LoadingScreen from '../modals/LoadingScreen';

export default function SignInScreen(props: any): React.JSX.Element {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [reqEmail, setReqEmail] = useState(false)
  const [reqPass, setReqPass] = useState(false)
  const [checkMail, setCheckMail] = useState<boolean>(true)
  const [isHidePass, setIsHidePass] = useState<boolean>(true)
  const [isRemembered, setIsRemembered] = useState<boolean>(true)
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch();


  const { navigation } = props

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 10000)
  })

  const Loading = (check: boolean) => {
    if (check) setIsLoading(true)
  }

  const handleLogin = async () => {
    if (email && password) {
      const emailValidation = Validate.email(email)
      setCheckMail(emailValidation)
      if (emailValidation) {
        Loading(true)
        try {
          const res = await authenticationAPI.HandleAuthentication(
            '/login',
            { email, password },
            'post',
          );
          console.log(res)
          dispatch(addAuth(res.data));

          await AsyncStorage.setItem(
            'auth',
            isRemembered ? JSON.stringify(res.data) : email,
          );
        } catch (error) {
          // console.log(error);
          setIsLoading(false)
          Alert.alert('Warning', 'Email or Password is incorrect!');
        }
      }
    }
    else {
      if (!email) setReqEmail(true)
      else setReqEmail(false)
      if (!password) setReqPass(true)
      else setReqPass(false)
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../image/backArrow.png')} style={styles.backArrow} />
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={styles.titleText}>Welcome Back!</Text>
          <Image source={require('../../image/wavingHand.png')} style={styles.hand} />
        </View>

        <Text style={styles.h1}>Sign up now to get access to personalized workouts and achieve your fitness goals.</Text>


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
                autoCapitalize='none'
                onChangeText={email => setEmail(email)}
              />
            </View>

            <Text style={{ color: 'red', marginTop: 5 }}>{reqEmail ? 'Email is required!' : (checkMail ? '' : 'Email is not invalid!')}</Text>
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={[styles.inputBox, { flexDirection: 'row', alignItems: 'center' }]}>
              <Image source={require('../../image/lockPass.png')} style={styles.icon} />
              <TextInput value={password} style={[{ flex: 1 }]}
                secureTextEntry={isHidePass}
                placeholder='Password'
                placeholderTextColor={'#B7ACAC'}
                onChangeText={pass => setPassword(pass)} />
              <TouchableOpacity onPress={() => setIsHidePass(!isHidePass)}>
                {
                  isHidePass ?
                    <Image source={require('../../image/hidePass.png')} style={styles.hidePassIcon} resizeMode='contain' />
                    :
                    <Image source={require('../../image/Eye.png')} style={styles.unhidePassIcon} resizeMode='contain' />
                }
              </TouchableOpacity>
            </View>
            <Text style={{ color: 'red', marginTop: 5 }}>{reqPass ? 'Password is required!' : ''}</Text>
          </View>

          <View style={styles.handleExcept}>
            <View style={{ flexDirection: 'row' }}>
              <Checkbox
                style={[styles.checkRemember, { marginTop: 4.5 }]}
                value={isRememberMe}
                onValueChange={setIsRememberMe}
                color={isRememberMe ? '#0866FF' : undefined}
              />

              <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'poppins', marginLeft: 5 }}>Remember me</Text>
            </View>

            <TouchableOpacity onPress={() => { navigation.navigate('ForgotPassScreen') }}
              style={{ marginTop: 2, marginLeft: 120 }}>
              {/* <GradientText text='Forgot Password?' /> */}
              <Text style={{ color: '#92A3FD' }}>Forgot Password?</Text>
            </TouchableOpacity>


          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.divider} />
          </View>

        </View>

        <View style={styles.socialContainer}>
          <View style={styles.btnSocialIcon}>
            <Image source={require('../../image/Fb.png')} style={styles.socialIcon} resizeMode='contain' />
          </View>
          <View style={styles.btnSocialIcon}>
            <Image source={require('../../image/Gg.png')} style={styles.socialIcon} resizeMode='contain' />
          </View>
          <View style={styles.btnSocialIcon}>
            <Image source={require('../../image/Apple.png')} style={styles.socialIcon} resizeMode='contain' />
          </View>
          <View style={styles.btnSocialIcon}>
            <Image source={require('../../image/Gh.png')} style={styles.socialIcon} resizeMode='contain' />
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={{ bottom: -160, width: 339 }} onPress={handleLogin}>
            <BtnColor name='Login' />
          </TouchableOpacity>
        </View>

        {
          isLoading && (
            <LoadingScreen visible={isLoading} message='Login...' style={styles.indicatorContainer} />
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
  hand: {
    height: 42,
    width: 42,
    marginLeft: 10,
    marginTop: 22,
  },
  h1: {
    height: 62,
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e5e5',
  },
  orText: {
    marginHorizontal: 10,
    color: '#8e8e93',
  },
  checkRemember: {
    borderRadius: 4,
    width: 14,
    height: 14,
  },
  handleExcept: {
    flexDirection: 'row',
    width: 'auto',
    alignItems: 'center',
    marginVertical: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  btnSocialIcon: {
    width: 55, height: 54, justifyContent: 'center',
    alignItems: 'center', backgroundColor: '#F5F5F5',
    borderRadius: 12
  },
  socialIcon: {
    width: 30,
    height: 30,
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

