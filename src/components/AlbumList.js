// src/components/AlbumList.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Colors from '../constants/Colors';

const AlbumList = ({ albums, onAlbumPress }) => {
  const renderAlbumItem = ({ item }) => (
    <TouchableOpacity
      style={styles.albumItem}
      onPress={() => onAlbumPress(item)}
    >
      <Image
        source={{ uri: item.coverArt }}
        style={styles.albumCover}
        defaultSource={require('../assets/default-album.png')}
      />
      <View style={styles.albumInfo}>
        <Text style={styles.albumTitle}>{item.title}</Text>
        <Text style={styles.albumArtist}>
          {item.artist} • {item.year}
        </Text>
        <Text style={styles.trackCount}>{item.tracks.length} tracks</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={albums}
      renderItem={renderAlbumItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  albumItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: Colors.textLight,
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  albumCover: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  albumInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  albumTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  albumArtist: {
    fontSize: 14,
    color: Colors.text,
    opacity: 0.8,
    marginBottom: 4,
  },
  trackCount: {
    fontSize: 12,
    color: Colors.primary,
  },
});

export default AlbumList;
