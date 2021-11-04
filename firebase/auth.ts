import firebase from './clientApp';
import 'firebase/firestore';
import { Client } from '../types/types';
import { setClient } from './queries';

export async function register(
  email: string,
  password: string,
  fullName: string,
) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = firebase.auth().currentUser;

    if (user !== null) {
      const client: Client = {
        id: user.uid,
        fullName,
        createdAt: new Date(),
      };
      await setClient(client);
    }
  } catch (err) {
    console.log('Error registrating');
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

export async function getCurrentUser() {
  return firebase.auth().currentUser;
}
