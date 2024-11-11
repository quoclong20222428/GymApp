/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet
} from 'react-native';

import { enableScreens } from 'react-native-screens';
enableScreens();

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import AuthNavigator from './src/navigator/AuthNavigator';
import store from './src/redux/store';
import { SplashScreen } from './src/screens';

function App(): React.JSX.Element {
  const [isShowSplash, setIsShowSplash] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false)
    }, 3000)
  })

  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent />

      
      {isShowSplash ? <SplashScreen /> :
        <AuthNavigator />
        
      }
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
