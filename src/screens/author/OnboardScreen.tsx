import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';

import LoginScreen from './LoginScreen';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import AuthNavigator from '../../navigator/AuthNavigator';

// Define your available routes in this stack
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

function OnboardingScreen(): React.JSX.Element {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Function to handle Next/Start button press
    const handleNextPress = () => {
        if (currentIndex < 2) {
            setCurrentIndex(currentIndex + 1) // Go to the next slide
        } else  if (currentIndex === 2){
            setCurrentIndex(2)
            // navigation.navigate('LoginScreen');
            // return (
            //     <AuthNavigator />
            // )
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../image/Vector.png')} style={styles.imageVector} resizeMode='cover' />
            <Swiper
                loop={false} //Keo qua -> true
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                dotColor="#ccc"
                activeDotColor="#8b5cf6"
                style={styles.swiper}
                onIndexChanged={(index) => setCurrentIndex(index)}
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
                    <TouchableOpacity
                    // onPress={() => navigation.navigate('Home')}
                    >
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

export default OnboardingScreen;
