import React, { useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import PlayerScreen from './src/PlayerScreen';
import Colors from './src/constants/Colors';

export default function App() {
  const [favoriteTracks, setFavoriteTracks] = useState([]);

  const toggleFavoriteTrack = trackId => {
    setFavoriteTracks(prev =>
      prev.includes(trackId)
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId],
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <RootNavigator
        favoriteTracks={favoriteTracks}
        toggleFavoriteTrack={toggleFavoriteTrack}
      />
      {/* <PlayerScreen /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030303',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
