import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from './firebase/clientApp';
import './BottomTabs'
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import NavBar from './BottomTabs';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  //Retrieves firestore collection called 'clients'
  const [clients, clientLoading, clientError] = useCollection(
    firebase.firestore().collection("clients"),
    {}
  );

  if (!clientLoading && clients) {
    clients.docs.map((doc) => console.log(doc.data()));
  }

  return (
    <View style={styles.container}>
        <Text>SIREN Mobile</Text>
        <StatusBar style="auto" />
      <NavBar></NavBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    height: '100%',
    backgroundColor: '#fff',
  },
});
