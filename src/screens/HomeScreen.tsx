// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity 
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import AlbumList from '../components/AlbumList';
import { mockAlbums } from '../services/mockData';
import Colors from '../constants/Colors';
import { Album } from '../types/music';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [albums, setAlbums] = useState(mockAlbums);
  
  const handleAlbumPress = (album: Album) => {
    navigation.navigate('AlbumDetail', { albumId: album.id });
  };
  
  const handleAdminPress = () => {
    navigation.navigate('Admin');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Music Library</Text>
        <TouchableOpacity 
          style={styles.adminButton} 
          onPress={handleAdminPress}
        >
          <Text style={styles.adminButtonText}>Admin</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.sectionTitle}>Albums</Text>
      
      <AlbumList 
        albums={albums} 
        onAlbumPress={handleAlbumPress} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.textLight,
  },
  adminButton: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  adminButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
});

export default HomeScreen;
