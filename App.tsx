/* eslint-disable react/style-prop-object */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Fonts } from 'assets/fonts/Fonts';
import { Client } from 'types/types';
import { getClient } from 'database/queries';
import { ClientProvider } from 'context/ContextProvider';
import RootNavigator from './src/navigation/RootNavigator';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    // backgroundColor: '#fff',
  },
});

export default function App() {
  const [fontsLoaded] = useFonts(Fonts);
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ClientProvider>
      <View style={styles.container}>
        <RootNavigator />
      </View>
    </ClientProvider>
  );
}
