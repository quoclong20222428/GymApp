/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { authReducer, authSelector, removeAuth } from '../../redux/authReducer';
import { useDispatch, useSelector } from 'react-redux';


function HomeScreen(): React.JSX.Element {
  const dispatch = useDispatch()

  const auth = useSelector(authSelector)

  return (
    <View style={styles.container}>
      <Button
        title='Logout'
        onPress={async () => {
          await AsyncStorage.setItem('auth', auth.email)
          dispatch(removeAuth({}))
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default HomeScreen;
