import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';
import { TextRegular } from 'assets/fonts/Fonts';
import { PageContainer } from 'screens/styles';
import { logout } from 'database/auth';
import { getAllCases, getClient } from 'database/queries';
import { Case } from 'types/types';
import firebase from 'database/clientApp';
import ProgressTracker from './ProgressTracker';

const HomeScreen = ({ navigation }: any) => {
  const uid = firebase.auth().currentUser?.uid;
  // const uid = 'sample'; use for sample testing multiple cases
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
  }, []);

  return (
    <PageContainer>
      <TextRegular>Welcome {name}!</TextRegular>
      <TextRegular>Your UID is: {uid}</TextRegular>
      {Object.keys(cases).map((id: any) => (
        <ProgressTracker
          key={id}
          type={cases[id].type}
          status={cases[id].status}
        />
      ))}
      <Button title="Logout" onPress={logout} />
    </PageContainer>
  );
};

export default HomeScreen;
