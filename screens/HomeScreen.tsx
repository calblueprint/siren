import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, Button } from 'react-native';
import firebase from '../firebase/clientApp';
import { logout } from '../firebase/auth';
import { getClient } from '../firebase/queries';

export const screenStyles = StyleSheet.create({
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
  });

  return (
    <View style={screenStyles.text}>
      <StatusBar />
      <Text>Welcome {name}!</Text>
      <Text>Your UID is: {uid}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default HomeScreen;
