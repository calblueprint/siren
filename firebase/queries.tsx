import firebase from './clientApp';
import { Client } from '../types/types';

const database = firebase.firestore();
const clientCollection = database.collection('clients');

export const getClient = async (id: string): Promise<Client> => {
  try {
    const doc = await clientCollection.doc(id).get();
    return doc.data() as Client;
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

export const getAllClients = async (): Promise<Client[]> => {
  try {
    const response = await clientCollection.get();
    return response.docs.map(doc => doc.data() as Client);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling
  }
};
