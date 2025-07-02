import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import AdminScreen from "../screens/AdminScreen";
import Colors from "../constants/Colors";
import AlbumDetailScreen from "../screens/AlbumDetailScreen";

export type RootStackParamList = {
    Home: undefined;
    Admin: undefined;
    AlbumDetail: { albumId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTintColor: Colors.textLight,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    contentStyle: {
                        backgroundColor: Colors.background,
                    }
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
                <Stack.Screen
                    name="AlbumDetail"
                    component={AlbumDetailScreen}
                    options={({ route }) => ({
                        title: 'Album Details'
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator;
