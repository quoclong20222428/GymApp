import React, { useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Animated, Easing } from 'react-native';

export default function LoadingScreen({ visible, message, style }: { visible: boolean, message: string, style: any }) {
    const { _style } = style

    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 1500, // Thời gian quay 1 vòng (2 giây)
                easing: Easing.linear, // Tốc độ quay đều
                useNativeDriver: true,
            })
        ).start();
    }, [rotateAnim]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Modal transparent={true} visible={visible} animationType="fade" style={_style} statusBarTranslucent={true}>
            <View style={styles.overlay}>
                <View style={styles.loadingContainer}>
                    {/* <ActivityIndicator size="large" color="#4285F4" /> */}
                    <Animated.Image
                        source={require('../image/loading.png')} // Thay bằng link hình ảnh của bạn
                        style={[styles.image, { transform: [{ rotate }] }]}
                    />
                    <Text style={styles.loadingText}>{message}</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        backgroundColor: '#FFFFFF',
        height: 222,
        width: 312,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 500,
        lineHeight: 27,
        color: '#333',
    },
    image: {
        width: 69,
        height: 66.2,
        alignSelf: 'center'
    },
});