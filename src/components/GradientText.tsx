import React from 'react';
import { StyleSheet, Text } from 'react-native';
// import MaskedView from '@react-native-community/masked-view';

import LinearGradient from 'react-native-linear-gradient';



export default function GradientText({ text }: { text: string }): React.JSX.Element {
    return (
        // <MaskedView maskElement={ 
        // }>

        <LinearGradient
            colors={['#7891ED', '#9DCEFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
            <Text style={styles.gradientText}>{text}</Text>

        </LinearGradient>

        // </MaskedView>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black', // This color won’t be visible, but is needed to render the text
    },
    gradientText: {
        fontSize: 16,
    },
});
