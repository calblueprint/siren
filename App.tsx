import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Client, Case, Document, Question, CaseStatus } from './types/types';
import {
  getClient,
  setClient,
  getCase,
  setCase,
  getDocument,
  setDocument,
  getQuestion,
  setQuestion,
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
    const client: Client = await getClient('sample');
    console.log(client.answers);
    client.fullName = 'Do Not Deletee';
    await setClient(client);

    const clientCase: Case = await getCase(client.id, 'daca-0');
    console.log(clientCase.status);
    clientCase.status = CaseStatus.SchedApt;
    await setCase(client.id, clientCase);

    const document: Document = await getDocument(
      client.id,
      clientCase.id,
      'document0',
    );
    console.log(document.url);
    document.type = 'driversLicense';
    await setDocument(client.id, clientCase.id, document);

    const question: Question = await getQuestion('JfgQHQm4W9rIsDyUB5Wm');
    console.log(question.displayText);
    question.example = 'b';
    await setQuestion(question);
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
