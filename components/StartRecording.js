import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const StartRecording = ({onPress}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <FontAwesome name="play" size={40} color="#1D3557" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }, 
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E63946',
        borderRadius: 120,
        width: 80,
        height: 80,
    }
});

export default StartRecording;