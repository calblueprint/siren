import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';
import firebase from '../../firebase/clientApp';
import { TextRegular } from '../../assets/fonts/Fonts';
import { PageContainer } from '../styles';
import { logout } from '../../firebase/auth';
import { getClient } from '../../firebase/queries';

const HomeScreen = ({ navigation }: any) => {
  const uid = firebase.auth().currentUser?.uid;
  const [name, setName] = useState('');

  useEffect(() => {
    async function getUserInfo() {
      if (uid === undefined) {
        navigation.navigate('Welcome');
      } else {
        const client = await getClient(uid);
        setName(client.fullName);
      }
    }
    getUserInfo();
  }, []);

  return (
    <PageContainer>
      <TextRegular>Welcome {name}!</TextRegular>
      <TextRegular>Your UID is: {uid}</TextRegular>
      <Button title="Logout" onPress={logout} />
    </PageContainer>
  );
};

export default HomeScreen;
