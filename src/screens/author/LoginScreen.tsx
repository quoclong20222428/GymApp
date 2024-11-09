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
  TouchableOpacity,
  View
} from 'react-native';


import BtnColor from './BtnColor';
import BtnNormal from './BtnNormal';
import BtnSocial from './BtnSocial';

function LoginScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnView}>
        <BtnSocial name={'Facebook'} iconName={'Facebook'} />
      </View>

      <View style={styles.btnView}>
        <BtnSocial name={'Google'} iconName={'Google'} />
      </View>

      <View style={styles.btnView}>
        <BtnSocial name={'Apple'} iconName={'Apple'} />
      </View>

      <View style={styles.btnView}>
        <BtnSocial name={'Github'} iconName={'Github'} />
      </View>

      <View style={styles.btnView}>
        <BtnColor name={'Sign In'} />
      </View>

      <TouchableOpacity style={styles.btnView}>
        <BtnNormal name={'Sign Up'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnView: {
    width: 339,
    // flexDirection: 'row',
  },

});

export default LoginScreen;
