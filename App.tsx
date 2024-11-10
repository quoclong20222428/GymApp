/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { enableScreens } from 'react-native-screens';
enableScreens();


import { SplashScreen } from './src/screens';
import {LoginScreen} from './src/screens';
import AuthNavigator from './src/navigator/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './src/screens/author/OnboardScreen';

function App(): React.JSX.Element {
  const [isShowSplash, setIsShowSplash] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false)
    }, 1500)
  })

  const Stack = createNativeStackNavigator();  
  
  return (
    // <>
      // <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      // {
        isShowSplash ? (
          <SplashScreen />
        ) : (
          // <NavigationContainer>
          //   <AuthNavigator />
          // </NavigationContainer>

          // <LoginScreen />
          <NavigationContainer>
            <OnboardingScreen/ >
          </NavigationContainer>

        //   <NavigationContainer>
        //   <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        //     <Stack.Screen name='Login' component={LoginScreen} />
        //   </Stack.Navigator>
        // </NavigationContainer>
        )
      // }
    // </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
