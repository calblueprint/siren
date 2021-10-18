import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from './firebase/clientApp';
import RootNavigator from './navigation/RootNavigator';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});

export default function App() {
  // Retrieves firestore collection called 'clients'
  const [clients, clientLoading] = useCollection(
    firebase.firestore().collection('clients'),
    {},
  );

  if (!clientLoading && clients) {
    clients.docs.map((doc: { data: () => any }) => console.log(doc.data()));
  }

  return (
    <View style={styles.container}>
      <RootNavigator />
    </View>
  );
}
