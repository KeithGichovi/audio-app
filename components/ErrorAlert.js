import React from  'react';
import { View, Alert } from 'react-native';

const ErrorAlert = ({error}) => {
    return (
        <View>
            {
                Alert.alert(
                    "Error",
                    error,
                    [{ 
                        text: "OK", 
                        onPress: () => console.log("OK Pressed")
                    }],
                    { 
                        cancelable: false 
                    }
                )
            }
        </View>        
    )
};

export default ErrorAlert;