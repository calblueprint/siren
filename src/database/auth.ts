import { Client } from 'types/types';
import { Alert } from 'react-native';
import firebase from './clientApp';
import 'firebase/firestore';
import { setClient } from './queries';

export async function register(
  email: string,
  password: string,
  fullName: string,
  language: string,
) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = firebase.auth().currentUser;

    if (user !== null) {
      const client: Client = {
        id: user.uid,
        email,
        fullName,
        createdAt: new Date(),
        answers: new Map(),
        language,
      };
      await setClient(client);
    }
  } catch (err) {
    console.log(err);
    Alert.alert('An unknown error occured');
  }
}

export async function login(email: string, password: string) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.log('Error signing in');
  }
}

export async function logout() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    console.log('Error logging out');
  }
}
