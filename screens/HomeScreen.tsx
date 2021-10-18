import React from 'react';
import { Text, View, StyleSheet, StatusBar, Button } from 'react-native';
import firebase from '../firebase/clientApp';

const auth = firebase.auth();

export const screenStyles = StyleSheet.create({
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const HomeScreen = ({ navigation }) => {
  const user: firebase.User | null = firebase.auth().currentUser;
  if (user == null) {
    return null; // TODO: send user back to login?
  }

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
      <Text>Welcome {user.email}!</Text>
      <Text>Your UID is: {user.uid}</Text>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
};

export default HomeScreen;
