import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import AdminScreen from "../screens/AdminScreen";

export type RootStackParamList = {
  Home: undefined;
  Admin: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#30c23b',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen}
                    options={{ title: 'Home' }}
                />
                <Stack.Screen 
                    name="Admin" 
                    component={AdminScreen}
                    options={{ title: 'Admin' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator;
