/* eslint-disable react/style-prop-object */
import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Fonts } from 'assets/fonts/Fonts';
import firebase from 'database/clientApp';
import { ClientProvider, LanguageProvider } from 'context/ContextProvider';
import WelcomeScreen from 'screens/Welcome/WelcomeScreen';
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

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('This will run after 5 seconds!');
      const uid = firebase.auth().currentUser?.uid;
      console.log('uid', uid);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View>
      <Text>Firebase broken</Text>
    </View>
    // <LanguageProvider>
    //   <ClientProvider>
    //     <View style={styles.container}>
    //       <RootNavigator />
    //     </View>
    //   </ClientProvider>
    // </LanguageProvider>
  );
}
