import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type AdminScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Admin'>;

interface Props {
    navigation: AdminScreenNavigationProp;
}

const AdminScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Screen</Text>
            
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[styles.button, styles.homeButton]} 
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.buttonText}>Go to Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#30c23b',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginBottom: 15,
    },
    homeButton: {
        backgroundColor: '#007AFF',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AdminScreen;
