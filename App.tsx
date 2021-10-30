/* eslint-disable react/style-prop-object */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Client } from './types/types';
import { getClient } from './firebase/queries';
import RootNavigator from './navigation/RootNavigator';
import GlobalThemes from './GlobalThemes';

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
        <RootNavigator />
      </View>
    </PaperProvider>
  );
}
