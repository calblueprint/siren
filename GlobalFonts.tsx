/* eslint-disable camelcase */
import React from 'react';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  PTSans_400Regular, // PTSans is Google's closest match to Myriad Pro
  PTSans_400Regular_Italic,
  PTSans_700Bold,
  PTSans_700Bold_Italic,
} from '@expo-google-fonts/pt-sans';

function declareFonts() {
  const [fontsLoaded] = useFonts({
    PTSans_400Regular,
    PTSans_400Regular_Italic,
    PTSans_700Bold,
    PTSans_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return <div />;
}

export default declareFonts;
