// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AlbumList from '../components/AlbumList';
import { mockAlbums } from '../services/mockData';
import Colors from '../constants/Colors';
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({ navigation }) => {
  const [albums, setAlbums] = useState([]);
  const handleAlbumPress = album => {
    navigation.navigate('AlbumDetail', { album: album });
  };

  const [musicList, setMusicList] = useState([]);

  const handleAdminPress = () => {
    navigation.navigate('Admin');
  };

  const fetchStreamingUrl = async document => {
    const linkRef = document.link; // Firestore DocumentReference
    const linkSnapshot = await linkRef.get(); // fetch the doc

    if (linkSnapshot.exists) {
      const data = linkSnapshot.data();
      return data?.url; // assuming 'url' is a string with the .mp3 link
    }

    return null;
  };

  useEffect(() => {
    async function fetchCollection() {
      const snapshot = await firestore().collection('Test').get();
      let album = {
        id: '1',
        title: 'Urban Rhythms',
        coverArt: 'https://example.com/album2.jpg',
        artist: 'Various Artists',
        year: 2023,
        tracks: snapshot.docs.map(doc => {
          console.log('----doc--------', doc.id, doc.data().link);
          return {
            id: doc.id,
            title: doc.data().name,
            artist: doc.data().artist,
            url: doc.data()
              .link /* 'https://sample-music.netlify.app/death%20bed.mp3' */,
            duration: doc.data().duration,
          };
        }),
      };

      // console.log('------------Snapshot-------', snapshot.docs);

      setAlbums([album]);
    }
    fetchCollection().catch(error => {
      console.error('Error fetching collection:', error);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Music Library</Text>
        <TouchableOpacity style={styles.adminButton} onPress={handleAdminPress}>
          <Text style={styles.adminButtonText}>Admin</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Albums</Text>

      <AlbumList albums={albums} onAlbumPress={handleAlbumPress} />
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
