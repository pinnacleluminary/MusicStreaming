// src/screens/AlbumDetailScreen.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  FlatList, 
  TouchableOpacity,
  ActivityIndicator 
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { mockAlbums } from '../services/mockData';
import Colors from '../constants/Colors';
import { Album, Track } from '../types/music';

type Props = NativeStackScreenProps<RootStackParamList, 'AlbumDetail'>;

const AlbumDetailScreen: React.FC<Props> = ({ route }) => {
  const { albumId } = route.params;
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundAlbum = mockAlbums.find(a => a.id === albumId);
      setAlbum(foundAlbum || null);
      setLoading(false);
    }, 500);
  }, [albumId]);

  const renderTrackItem = ({ item, index }: { item: Track; index: number }) => (
    <TouchableOpacity style={styles.trackItem}>
      <Text style={styles.trackNumber}>{index + 1}</Text>
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{item.title}</Text>
        <Text style={styles.trackGenre}>{item.genre}</Text>
      </View>
      <Text style={styles.trackDuration}>
        {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!album) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Album not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.albumHeader}>
        <Image 
          source={{ uri: album.coverArt }} 
          style={styles.albumCover}
          defaultSource={require('../assets/default-album.png')}
        />
        <View style={styles.albumInfo}>
          <Text style={styles.albumTitle}>{album.title}</Text>
          <Text style={styles.albumArtist}>{album.artist}</Text>
          <Text style={styles.albumYear}>{album.year}</Text>
          <Text style={styles.trackCount}>{album.tracks.length} tracks</Text>
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>Tracks</Text>
      
      <FlatList
        data={album.tracks}
        renderItem={renderTrackItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.trackList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: Colors.error,
    fontSize: 16,
  },
  albumHeader: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.textLight,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  albumCover: {
    width: 120,
    height: 120,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  albumInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  albumTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  albumArtist: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  albumYear: {
    fontSize: 14,
    color: Colors.text,
    opacity: 0.8,
    marginBottom: 4,
  },
  trackCount: {
    fontSize: 14,
    color: Colors.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  trackList: {
    paddingHorizontal: 16,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  trackNumber: {
    width: 30,
    fontSize: 14,
    color: Colors.text,
    opacity: 0.6,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 2,
  },
  trackGenre: {
    fontSize: 12,
    color: Colors.text,
    opacity: 0.6,
  },
  trackDuration: {
    fontSize: 14,
    color: Colors.text,
    opacity: 0.8,
  },
});

export default AlbumDetailScreen;
