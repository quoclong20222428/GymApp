/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import getImagePath from '../../components/imagePath';



export function ChooseFocusArea(): React.JSX.Element {
    const [focusArea, setFocusArea] = useState<string | null>(null)
    const [indexImage, setIndexImage] = useState<string>('body0')
    const focusAreas = ["Full Body", "Back", "Chest", "Abdominals", "Leg", "Shoulder", "Bicep", "Tricep"]

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Choose Your Focus Area</Text>
            <Text style={styles.subtitle}>
                Tell us which part of your body you'd like to focus on during your workouts.
            </Text>
            <View style={{flexDirection: 'row'}}>
                <FlatList
                    data={focusAreas}
                    keyExtractor={(item, index) => (index+1).toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={[
                                styles.optionButton,
                                focusArea === item && styles.selectedButton,
                            ]}
                            onPress={() => {
                                setFocusArea(item)
                                setIndexImage("body"+(index+1))
                            }}
                        >
                            <Text style={styles.optionText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    numColumns={1} // Set to 1 column
                    key={'1-column'} // Force re-render when numColumns changes
                    nestedScrollEnabled={true} // Optional: Enable if inside ScrollView
                    // horizontal
                />

                <Image source={getImagePath(indexImage)} style={styles.image}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        alignItems: "center",
        flex: 1,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'poppins',
        marginTop: 20,
        lineHeight: 45,
    },
    subtitle: {
        height: 62,
        width: 368,
        fontSize: 16,
        color: '#6E6666',
        textAlign: 'center',
        lineHeight: 24,
    },
    optionButton: {
        padding: 15,
        margin: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        alignItems: "center",
    },
    selectedButton: {
        backgroundColor: "#d0f0ff",
        borderColor: "#007BFF",
    },
    optionText: {
        fontSize: 16,
        fontWeight: "500",
    },
    image: {
        width: 253,
        height: 318,
        marginTop: 80,
        marginLeft: 10,
    }
});
