/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';


function SplashScreen(): React.JSX.Element {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + '.' : ''))
        }, 2500); // Thời gian đổi dấu chấm là 500ms

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={require('../image/logo1.png')} style={styles.imageStyle} />
                <Image source={require('../image/logo_CNTT.png')} style={styles.imageStyle} />
            </View>
            <View style={styles.title}>
                <Image source={require('../image/FitnestX.png')} />
            </View>
            <Text style={styles.loading}>Loading {dots}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    logo: {
        flexDirection: 'row',
        paddingHorizontal: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    imageStyle: {
        width: 150,
        height: 150,
    },
    title: {

    },
    board: {
        margin: 20,
    },
    indicate: {
        position: 'absolute',
        bottom: 10,
    },
    loading: {
        width: 75,
        fontWeight: 'bold',
        fontSize: 15,
        position: 'absolute',
        bottom: 10,
    }
});

export default SplashScreen;
