import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const AudioViewer = ({ index ,duration, onPress}) => {
    return (
        
        <View style={styles.listContainer}>
            <Text style={styles.filename}> Recording #{index + 1}</Text>
            <Text>{duration}</Text>
            <Button title="Play" onPress={onPress} />
        </View>
        
    )
}

const styles = StyleSheet.create({
    listContainer:{
        flex: 1,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        marginVertical:4,
    },
    filename:{
        width:200,
        overflow:'hidden'
    }
});

export default AudioViewer;