/* eslint-disable react/style-prop-object */
/* eslint-disable camelcase */
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import declareFonts from './styles/GlobalFonts';
import { Client } from './types/types';
import { getClient } from './firebase/queries';
import NavBar from './BottomTabs';
import GlobalThemes from './styles/GlobalThemes';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});

export default function App() {
  declareFonts();
  const logData = async (): Promise<void> => {
    const client: Client = await getClient('sample');
    // eslint-disable-next-line no-console
    console.log(client.id);
  };
  useEffect(() => {
    logData();
  }, []);

  return (
    <PaperProvider theme={GlobalThemes}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <NavBar />
        </NavigationContainer>
      </View>
    </PaperProvider>
  );
}
