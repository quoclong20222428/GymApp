/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// Define your available routes in this stack
type RootStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
  // Add other screens if needed
};

import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


import { NavigationProp, useNavigation } from '@react-navigation/native';
import { BtnColor, BtnNormal, BtnSocial } from "../../components";
import authenticationAPI from '../../apis/authApi';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addAuth } from '../../redux/authReducer';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '120715624266-15cdmcgvm51sai78leu47os2h93hjhgq.apps.googleusercontent.com',
  // iosClientId: 
})

export default function LoginScreen(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const api = `/google-signin`;
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      
      const user = userInfo.data?.user

      console.log(user)

      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        user,
        'post',
      );
console.log(res)
      // dispatch(addAuth(res.data));

      // await AsyncStorage.setItem('auth', JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn = () => {
    navigation.navigate('SignInScreen')
  }

  const handleSignUp = () => {
    navigation.navigate('SignUpScreen')
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <TouchableOpacity style={{marginTop: 20}} onPress={async () => await GoogleSignin.signOut()}>
        <Text>LogOut GG</Text>
      </TouchableOpacity> */}
      <View>
        <Image source={require('../../image/FitnestX.png')} style={styles.logo} />
      </View>

      <View>
        <Text style={styles.h1}>
          Let Get Started!
        </Text>

        <Text style={styles.h2}>
          Embark on a fitness and workout adventure
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.btnView}>
          <BtnSocial name={'Facebook'} iconName={'Facebook'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnView} onPress={handleLoginWithGoogle}>
          <BtnSocial name={'Google'} iconName={'Google'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnView}>
          <BtnSocial name={'Apple'} iconName={'Apple'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnView}>
          <BtnSocial name={'Github'} iconName={'Github'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnView} onPress={handleSignUp}>
          <BtnColor name={'Sign Up'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnView} onPress={handleSignIn}>
          <BtnNormal name={'Login'} />
        </TouchableOpacity>

      </View>
      <Text style={[styles.h2, { position: 'absolute', bottom: -20 }]}>Privacy Policy  .  Terms for Service</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  btnView: {
    width: 339,
  },
  logo: {
    marginBottom: 30,
  },
  h1: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 1,
  },
  h2: {
    color: '#6E6666',
    textAlign: 'center',
    marginBottom: 40,
  }

});
