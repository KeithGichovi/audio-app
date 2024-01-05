import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AudioComponent from './AudioComponent';

const AudioListScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sessions List!</Text>
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
