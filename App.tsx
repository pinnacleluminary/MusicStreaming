/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import Colors from './src/constants/Colors';

function App() {

  // useEffect(() => {
  //   console.log('App component mounted');
  // }, []);
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.primary}
      />
      <RootNavigator />
    </>
  );
}

export default App;
