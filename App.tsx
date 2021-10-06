import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from './firebase/clientApp';
import renderForm from './jotform/jotform';

export default function App() {
  //Retrieves firestore collection called 'clients'
  const [clients, clientLoading, clientError] = useCollection(
    firebase.firestore().collection("clients"),
    {}
  );

  if (!clientLoading && clients) {
    clients.docs.map((doc) => console.log(doc.data()));
  }

  const intakeForm = renderForm();

  return (
    <View style={styles.container}>
      <Text>SIREN Mobile</Text>
      {intakeForm}
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
