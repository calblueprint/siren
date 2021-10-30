import React, { useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, Button } from 'react-native';
import firebase from '../firebase/clientApp';
import { Client } from '../types/types';
import { getClient } from '../firebase/queries';

const auth = firebase.auth();

export const screenStyles = StyleSheet.create({
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const HomeScreen = ({ navigation }) => {
  if (auth.currentUser == null) {
    return <></>;
  }

  const user: firebase.User = auth.currentUser; // TODO: user displayname will not update until reload

  const onLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={screenStyles.text}>
      <StatusBar />
      <Text>Welcome {user.displayName}!</Text>
      <Text>Your UID is: {user.uid}</Text>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
};

export default HomeScreen;
