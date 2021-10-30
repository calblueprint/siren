/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Client } from 'types/types';
import { getClient } from 'database/queries';
import NavBar from 'components/BottomTabs';
import GlobalThemes from 'themes/GlobalThemes';

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

  return (
    <PaperProvider theme={GlobalThemes}>
      <View style={styles.container}>
        <Text>SIREN Mobile</Text>
        <StatusBar style="auto" />
        <NavigationContainer>
          <NavBar />
        </NavigationContainer>
      </View>
    </PaperProvider>
  );
}
