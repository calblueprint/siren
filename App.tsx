/* eslint-disable prettier/prettier */
/* eslint-disable react/style-prop-object */
/* eslint-disable camelcase */
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
// import declareFonts from './styles/GlobalFonts';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  PTSans_400Regular, // PTSans is Google's closest match to Myriad Pro
  PTSans_400Regular_Italic,
  PTSans_700Bold,
  PTSans_700Bold_Italic,
} from '@expo-google-fonts/pt-sans';
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
  const [fontsLoaded] = useFonts({
    PTSans_400Regular,
    PTSans_400Regular_Italic,
    PTSans_700Bold,
    PTSans_700Bold_Italic,
  });
  const logData = async (): Promise<void> => {
    const client: Client = await getClient('sample');
    // eslint-disable-next-line no-console
    console.log(client.id);
  };
  useEffect(() => {
    logData();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

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
