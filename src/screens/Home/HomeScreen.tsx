import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { TextTitle } from 'assets/fonts/Fonts';
import { NameContainer, PageContainer } from 'screens/styles';
import { getAllCases, getClient } from 'database/queries';
import { Case, CaseStatus } from 'types/types';
import firebase from 'firebase';
import ProgressTracker from 'components/ProgressTracker/ProgressTracker';

const HomeScreen = ({ navigation }: any) => {
  const uid = firebase.auth().currentUser?.uid;
  // const uid = 'sample'; // use to test multiple cases
  const isFocused = useIsFocused();
  const [name, setName] = useState('');
  const [cases, setCases] = useState([] as Case[]);

  useEffect(() => {
    async function getUserInfo() {
      if (uid === undefined) {
        navigation.navigate('Welcome');
      } else {
        const client = await getClient(uid);
        setName(client.fullName);
        const clientCases = await getAllCases(uid);
        setCases(clientCases);
      }
    }
    getUserInfo();
  }, [isFocused]);

  return (
    <PageContainer>
      <NameContainer>
        <TextTitle>Hi {name}!</TextTitle>
      </NameContainer>
      <ScrollView>
        {cases.length !== 0 ? (
          Object.keys(cases).map((id: any) => (
            <ProgressTracker
              key={id}
              type={cases[id].type}
              status={cases[id].status}
            />
          ))
        ) : (
          <ProgressTracker
            key="id"
            type="No Cases Yet" // yes, bad
            status={CaseStatus.SubmitForm} // default case status
            // Under the hood, an official case & its status isn't !exist in Firebase until client submits intake form
          />
        )}
      </ScrollView>
    </PageContainer>
  );
};

export default HomeScreen;
