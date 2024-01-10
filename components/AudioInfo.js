import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

/***
 * @exports AudioInfo
 * @description The audio info.
 * @function View - The function that creates a view.
 * @function Text - The function that creates a text.
 * @function TextInput - The function that creates a text input.
 * @function StyleSheet - The function that creates a stylesheet.
 * @returns The audio info view.
 * 
 */
const AudioInfo = ({ counter, time }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState('');
    return(

        <View style={styles.fill}>
            {isEditing ? (
                <TextInput
                style={styles.input}
                placeholder="Enter new name"
                value={newName}
                onChangeText={(text) => setNewName(text)}
                onSubmitEditing={() => setIsEditing(false)}
                />
                
            ) : (
                <Text style={styles.fileName} onLongPress={() => setIsEditing(true)}>
                {newName || 'Recording ' + counter }
                </Text>
            )}
          <Text style={styles.duration}>Duration: {time}</Text>
        </View>
    
    )
}

const styles = StyleSheet.create({
    fill: {
        flex: 1,
        margin: 15,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        padding: 5,
        fontSize: 16,
    },
    fileName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    duration: {
        fontSize: 14,
        marginTop: 5,
    }
});

export default AudioInfo;