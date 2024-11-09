import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function BtnColor({name}: {name:string}) {
    return (
        <TouchableOpacity style={styles.buttonContainer}>
          <LinearGradient
            colors={['#92A3FD', '#9DCEFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{name}</Text>
          </LinearGradient>
        </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
    buttonContainer: {
      borderRadius: 25,
      overflow: 'hidden', // to ensure the gradient is rounded
      marginBottom: 20,
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      alignItems: 'center',
      borderRadius: 25,
      borderWidth: 1,
      borderColor: '#D9D9D9',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default BtnColor;
