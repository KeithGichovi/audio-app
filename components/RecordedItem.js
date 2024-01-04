import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const RecordedItem = ({ onPlay, onSave }) => {
    
    return (
        <View style={styles.row}>
            <Button onPress={onPlay} title="Play" style={styles.play}/>
            <Button onPress={onSave} title="Save" style={styles.save}/>
        </View>
    );
};


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'space-between',
        justifyContent: 'space-between',
        marginLeft: 30,
        marginRight: 30
    },
    play: {
        marginLeft: 20,
    },
    save: {
        marginRight: 20,
    }

});

export default RecordedItem;
