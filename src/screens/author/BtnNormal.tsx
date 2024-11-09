import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function BtnNormal({name}: {name:string}) {
    return (
        <TouchableOpacity style={[styles.buttonContainer, styles.gradient]}>
            <Text style={styles.buttonText}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: '#9DCEFF1A',
        borderColor: '#D9D9D9',
        borderWidth: 1,
    },
    gradient: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BtnNormal;
