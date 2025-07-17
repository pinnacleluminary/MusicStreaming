import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { mockAlbums } from '../services/mockData';
import Colors from '../constants/Colors';
import TrackPlayer, { Capability } from 'react-native-track-player';

const TRACK_PLAYER_CONTROLS_OPTS = {
  waitforBuffer: true,
  stopWithApp: false,
  alwaysPauseOnInterruption: true,
  capabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
    Capability.SeekTo,
  ],
  compactCapabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
  ],
};

const AlbumDetailScreen = ({ route, favoriteTracks, toggleFavoriteTrack }) => {
  // const { albumId } = route.params;
  const [album, setAlbum] = useState(route.params.album || null);
  const [loading, setLoading] = useState(false);
  const [playbackId, setPlaybackId] = useState('-1');

  useEffect(() => {
    let isMounted = true;

    const setupPlayer = async () => {
      try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.reset();

        if (album && isMounted) {
          await TrackPlayer.add(album.tracks);
          await TrackPlayer.updateOptions(TRACK_PLAYER_CONTROLS_OPTS);
        }
      } catch (error) {
        console.warn('TrackPlayer setup error:', error.message);
      }
    };

    setupPlayer();

    // Cleanup: destroy player on unmount
    return () => {
      isMounted = false;
      TrackPlayer.destroy()
        .then(() => console.log('TrackPlayer destroyed'))
        .catch(err => console.warn('TrackPlayer destroy error:', err));
    };
  }, [album]);

  const handlePlayPause = async index => {
    if (playbackId === index) {
      setPlaybackId('-1');
      await TrackPlayer.pause();
    } else {
      setPlaybackId(index);
      console.log(index);
      await TrackPlayer.skip(Number(index));
      await TrackPlayer.play();
    }
  };

  useEffect(() => {
    if (album) {
      setLoading(false);
    }
  }, [album]);

  const renderTrackItem = ({ item, index }) => {
    const isFavorite = favoriteTracks.includes(item.id);

    return (
      <View style={styles.trackItem}>
        <Text style={styles.trackNumber}>{index + 1}</Text>
        <View style={styles.trackInfo}>
          <Text style={styles.trackTitle}>{item.title}</Text>
          <Text style={styles.trackGenre}>{item.artist}</Text>
        </View>
        <Text style={styles.trackDuration}>
          {Math.floor(item.duration / 60)}:
          {(item.duration % 60).toString().padStart(2, '0')}
        </Text>

        <TouchableOpacity
          onPress={() => toggleFavoriteTrack(item.id)}
          style={{ marginLeft: 12 }}
        >
          <Text style={{ fontSize: 20 }}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginLeft: 12 }}
          onPress={() => handlePlayPause(index)}
        >
          <Text style={{ fontSize: 20 }}>
            {playbackId === index ? '⏸️' : '▶️'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginLeft: 12 }}>
          <Text style={{ fontSize: 20 }}></Text>
        </TouchableOpacity>
      </View>
    );
  };

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
        keyExtractor={item => item.id}
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
