import React from  'react';
import { View, Alert } from 'react-native';

/***
 * @exports ErrorAlert
 * @description The error alert.
 * @function View - The function that creates a view.
 * @function Alert - The function that creates an alert.
 * 
 */
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