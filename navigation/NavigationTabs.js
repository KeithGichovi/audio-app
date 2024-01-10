import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import AudioListScreen from "../Screens/AudioList/AudioListScreen";
import RecordAudioScreen from "../Screens/RecordAudio/RecordAudioScreen";

/**
 * @function createBottomTabNavigator - The function that creates the bottom tab navigator.
 * 
 * 
 */
const  Tab = createBottomTabNavigator();

/**
 * 
 * @returns The navigation tabs.
 * 
 */
const NavigationTabs = () => {
    return (

        <Tab.Navigator
            initialRouteName="Record"
            screenOptions={{ 
                headerShown: false,
                tabBarActiveTintColor: '#1D3557',
                tabBarInactiveTintColor: '#E63946',
                tabBarStyle: {
                    showLabel: false,
                    size: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                }
            }}
            
        >
                <Tab.Screen name="Record" component={RecordAudioScreen}
                    options={{ 
                        tabBarIcon: ({ color, size }) => <MaterialIcons name="multitrack-audio" size={size} color={color} />
                    }}
                />

                <Tab.Screen name="AudioList" component={AudioListScreen}
                    options={{ 
                        tabBarIcon: ({ color, size }) => <AntDesign name="addfolder" size={size} color={color} />
                    }}
                />
            

        </Tab.Navigator>


    )
}

export default NavigationTabs;
