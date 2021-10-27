/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Client } from './types/types';
import { getClient } from './firebase/queries';
import NavBar from './BottomTabs';
import GlobalThemes from './GlobalThemes';
import { Provider as PaperProvider } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});

export default function App() {
  const logData = async (): Promise<void> => {
    // Retrieves firestore collection called 'clients'
    const clientSnap: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> =
      await getAllClients();
    const caseSnap: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> =
      await getAllCasesByID(clientSnap.docs[0].id);
    const documentSnap: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> =
      await getAllDocumentsByID(clientSnap.docs[0].id, caseSnap.docs[0].id);
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
