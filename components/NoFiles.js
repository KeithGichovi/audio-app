import React from "react";
import { View, Text, StyleSheet } from "react-native";



const NoFiles = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>You have saved no files</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 50,
        flex: 1,
        justifyContent: "center",
        paddingVertical: 20,
    },
    text: {
        fontSize: 20,
        textAlign: "center",
    },
});

export default NoFiles;