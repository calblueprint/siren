import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useCollection } from 'react-firebase-hooks/firestore';
import { NavigationContainer } from '@react-navigation/native';
import firebase from './firebase/clientApp';
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
  // Retrieves firestore collection called 'clients'
  const [clients, clientLoading] = useCollection(
    firebase.firestore().collection('clients'),
    {},
  );

  if (!clientLoading && clients) {
    clients.docs.map(doc => console.log(doc.data()));
  }

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
