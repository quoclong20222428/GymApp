/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Swiper from 'react-native-swiper';

type RootStackParamList = {
    LoginScreen: undefined; // Home screen doesn’t expect any parameters
    // Add other screens if needed
};

const { width } = Dimensions.get('window');

const slides = [
    {
        id: 0,
        title: 'Diverse Exercise',
        description: 'FitnestX offers a variety of workouts',
    },
    {
        id: 1,
        title: 'AI Integration',
        description: 'FitnestX provides AI that supports workouts and diet',
    },
    {
        id: 2,
        title: 'Track Workouts',
        description: 'FitnestX allows you to track your workout progress',
    },
];

export default function OnboardScreen(): React.JSX.Element {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const handleToLoginScreen = () => {
        navigation.navigate('LoginScreen');
    }
    // Function to handle Next/Start button press
    const handleNextPress = () => {
        if (currentIndex < 2) {
            setCurrentIndex(currentIndex + 1) // Go to the next slide
        } else if (currentIndex === 2) {
            setCurrentIndex(2)
            handleToLoginScreen()
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../image/Vector.png')} style={styles.imageVector} resizeMode='cover' />
            <Swiper
                loop={false} //Keo quay ve 1 -> true
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                dotColor="#ccc"
                activeDotColor="#8b5cf6"
                style={styles.swiper}
                
                onIndexChanged={(index) => setCurrentIndex(index)}
                index={currentIndex}
            >
                {slides.map((slide, index) => (
                    <View key={slide.id} style={styles.slide}>
                        <Text style={styles.title}>{slide.title}</Text>
                        <Text style={styles.description}>{slide.description}</Text>
                    </View>
                ))}
            </Swiper>
            <View style={styles.buttonContainer}>
                <View>
                    <TouchableOpacity onPress={handleToLoginScreen}>
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                    {
                        currentIndex !== 2 ?
                            <Image source={require('../../image/ArrowRight.png')} style={styles.ArrowRight} resizeMode='contain' />
                            :
                            <Text style={styles.nextButtonText}>Start</Text>
                    }
                    {/* <Text>{currentIndex}</Text>  */}
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    slide: {
        width,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    swiper: {
        marginTop: '10%',  // Position swiper below the image
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginBottom: 200,  // Moves dots higher up
    },
    activeDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginBottom: 200,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30,
    },
    button: {
        backgroundColor: '#8b5cf6',
        width: 65,
        height: 65,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: -250,
    },
    nextButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    skipText: {
        fontSize: 16,
        color: '#aaa',
        marginLeft: -250,
    },
    ArrowRight: {
        width: 24,
        height: 24,
    },
    imageVector: {
        height: '59.45%',
        width: '100%',
    },
});
