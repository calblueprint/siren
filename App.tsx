/* eslint-disable react/style-prop-object */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Fonts } from 'assets/fonts/Fonts';
import { Client } from 'types/types';
import { getClient } from 'database/queries';
import RootNavigator from './src/navigation/RootNavigator';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});

export default function App() {
  const logData = async (): Promise<void> => {
    const client: Client = await getClient('sample');
    // eslint-disable-next-line no-console
    console.log(client.id);
  };
  useEffect(() => {
    logData();
  }, []);

  const [fontsLoaded] = useFonts(Fonts);
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <RootNavigator />
    </View>
  );
}
