import TrackPlayer from 'react-native-track-player';
import { AppRegistry } from 'react-native';
import App from './App.js';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./service.js'));
