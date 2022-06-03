import { Client } from 'types/types';
import { alertTextStr } from 'database/helpers';
import firebase from './clientApp';
import 'firebase/firestore';
import { setClient } from './queries';

const db = firebase.firestore();
const clientCollection = db.collection('clients');
let user = firebase.auth().currentUser;

// helper func to handle if user is null (a user would be null because the currentUser is retrieved before it is set)
function handleUser() {
  if (user === null) {
    user = firebase.auth().currentUser;
  }
}

export async function register(
  email: string,
  password: string,
  fullName: string,
  language: string,
) {
  try {
    const usr = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    if (usr.user !== null) {
      const client: Client = {
        id: usr.user.uid,
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

export async function login(email: string, password: string, langStr: string) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    // TO DO: error handling for mismatched languages
  } catch (err) {
    alertTextStr('The email or password you entered is invalid.', langStr);
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
    user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user?.email as string,
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
): Promise<boolean> {
  try {
    handleUser();
    reauthenticate(currPassword);
    await user?.updatePassword(newPassword);
    return true;
  } catch (err) {
    console.log('Error in updating password');
    return false;
  }
}

export async function updateEmail(newEmail: string, clientId: string) {
  try {
    const userDoc = clientCollection.doc(clientId);
    const newFields = { email: newEmail };
    await userDoc.update(newFields);
    await user?.updateEmail(newEmail);
  } catch (err) {
    console.log('Error in updating email');
  }
}

export async function updateFirebaseLanguage(lang: string, clientId: string) {
  try {
    const userDoc = clientCollection.doc(clientId);
    const newFields = { language: lang };
    await userDoc.update(newFields);
    return true;
  } catch (err) {
    console.log('Error in updating language preference');
    console.log(user);
    return false;
  }
}
