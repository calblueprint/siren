import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  getAllClients,
  getAllCasesByID,
  getAllDocumentsByID,
} from './firebase/queries';
import firebase from './firebase/clientApp';
import NavBar from './BottomTabs';

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
    console.log(clientSnap.docs[0].data());
    console.log(caseSnap.docs[0].data());
    console.log(documentSnap.docs[0].data());
  };
  useEffect(() => {
    logData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>SIREN Mobile</Text>
      <StatusBar style="auto" />
      <NavigationContainer>
        <NavBar />
      </NavigationContainer>
    </View>
  );
}
