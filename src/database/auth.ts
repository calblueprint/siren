import { Client } from 'types/types';
import firebase from './clientApp';
import 'firebase/firestore';
import { setClient } from './queries';

const db = firebase.firestore();
const clientCollection = db.collection('clients');
const user = firebase.auth().currentUser;

export async function register(
  email: string,
  password: string,
  fullName: string,
  language: string,
) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);

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
  }
}

export async function login(email: string, password: string) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    // TO DO: error handling for mismatched languages
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

export async function reauthenticate(currPassword: string) {
  try {
    // const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user?.email,
      currPassword,
    );
    await user?.reauthenticateWithCredential(credential);
  } catch (err) {
    console.log('Error in reauthenticating');
  }
}

export async function updatePassword(
  currPassword: string,
  newPassword: string,
) {
  try {
    reauthenticate(currPassword);
    await user?.updatePassword(newPassword);
  } catch (err) {
    console.log('Error in updating password');
  }
}

export async function updateEmail(newEmail: string) {
  try {
    const userDoc = clientCollection.doc(user?.uid);
    const newFields = { email: newEmail };
    await userDoc.update(newFields);
    await user?.updateEmail(newEmail);
  } catch (err) {
    console.log('Error in updating email');
  }
}

export async function updateFirebaseLanguage(lang: string) {
  try {
    const userDoc = clientCollection.doc(user?.uid);
    const newFields = { language: lang };
    await userDoc.update(newFields);
  } catch (err) {
    console.log('Error in updating language preference');
  }
}
