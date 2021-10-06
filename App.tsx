import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getAllClients, getAllCasesByID, getAllDocumentsByID } from './firebase/queries'
import firebase from './firebase/clientApp';


export default function App() {
  useEffect(() => {
    logData()
  }, []);

  const logData = async (): Promise<void> => {
    //Retrieves firestore collection called 'clients'
    const clientSnap: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> = await getAllClients()
    const caseSnap: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> = await getAllCasesByID(clientSnap.docs[1].id)
    const documentSnap: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> = await getAllDocumentsByID(clientSnap.docs[1].id, caseSnap.docs[0].id)
    console.log(clientSnap.docs[1].data())
    console.log(caseSnap.docs[0].data())
    console.log(documentSnap.docs[0].data())
  }

  return (
    <View style={styles.container}>
      <Text>SIREN Mobile</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
