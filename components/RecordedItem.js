import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const RecordedItem = ({ onPlay, onShare, onDelete, onUpload }) => {
    
    return (
        <View style={styles.row}>
            
            <TouchableOpacity onPress={onPlay} style={styles.save}>
                <Entypo name="controller-play" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={onDelete} style={styles.save}>
                <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={onShare} style={styles.save}>
                <AntDesign name="sharealt" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onUpload} style={styles.save}>
                <MaterialIcons name="save-alt" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'space-between',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20
    },
    play: {
        marginTop: 10,
    },
    save: {
        margin: 15,
    }

});

export default RecordedItem;
