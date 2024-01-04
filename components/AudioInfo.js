import React from 'react';
import { Text, StyleSheet } from 'react-native';


const AudioInfo = ({ counter, time }) => {
    return(

        <Text style={styles.fill}>
                Recording #{counter} | {time}
        </Text>
    )
}

const styles = StyleSheet.create({
    fill: {
        flex: 1,
        margin: 15,
        fontSize: 16,
    }
});

export default AudioInfo;