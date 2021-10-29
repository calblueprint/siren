/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Client, Question } from './types/types';
import { getClient, getAllQuestions } from './firebase/queries';
import NavBar from './BottomTabs';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  questions: {
    //top: '16%',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  nav: {
    height: '9%'
  }
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
    <View style={styles.container}>
      <Text>SIREN Mobile</Text>
      <StatusBar style="auto" />
      <NavigationContainer>
        <NavBar />
      </NavigationContainer>
    </View>
  );
}
