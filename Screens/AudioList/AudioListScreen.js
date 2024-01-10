import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AudioComponent from './AudioComponent';

/***
 * 
 * @description The audio list screen.
 * @function View - The function that creates a view.
 * @function Text - The function that creates a text.
 * @function StyleSheet - The function that creates a stylesheet.
 * @returns The audio list screen view.
 * 
 */
const AudioListScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Your saved Sessions.</Text>
            <AudioComponent/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 15,
        marginTop: 50,
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingVertical: 20,
    },
});

export default AudioListScreen;
