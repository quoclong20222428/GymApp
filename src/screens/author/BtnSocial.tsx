import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import getIconPath from './iconPath';


function BtnSocial({ name, iconName }: { name: string, iconName: string }) {
    const iconPath = getIconPath(iconName)

    return (
        <TouchableOpacity style={[styles.buttonContainer, styles.gradient]}>
            {iconPath && <Image source={iconPath} style={styles.icon} resizeMode='contain'/>}
            <Text style={styles.buttonText}>Continue with {name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        borderColor: '#D9D9D9',
        borderWidth: 1,
        marginBottom: 20,
        flexDirection: 'row',
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
    icon: {
        height: 27,
        width: 27,
        marginRight: 40,
    }
});

export default BtnSocial;
