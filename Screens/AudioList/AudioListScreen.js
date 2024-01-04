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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default AudioListScreen;
