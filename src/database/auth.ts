import { Client } from 'types/types';
import firebase from './clientApp';
import 'firebase/firestore';
import { setClient, getClient } from './queries';

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
        answers: new Map(),
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

export async function getCurrentClient(): Promise<Client | undefined> {
  const uid = firebase.auth().currentUser?.uid;
  if (uid !== undefined) {
    const client = await getClient(uid);
    return client;
  }
  return undefined;
}
