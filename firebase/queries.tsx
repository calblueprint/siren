import firebase from './clientApp';
import { Client, Case, Document, Question } from '../types/types';

const database = firebase.firestore();
const clientCollection = database.collection('clients');
const questionCollection = database.collection('questions');

export const getClient = async (clientId: string): Promise<Client> => {
  try {
    const doc = await clientCollection.doc(clientId).get();
    return doc.data() as Client;
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

export const getAllClients = async (): Promise<Client[]> => {
  try {
    const ref = await clientCollection.get();
    return ref.docs.map(doc => doc.data() as Client);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling
  }
};

export const setClient = async (client: Client) => {
  try {
    await clientCollection.doc(client.id).set(client);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

export const addClient = async (client: Client) => {
  try {
    await clientCollection.add(client);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

export const getCase = async (
  clientId: string,
  caseId: string,
): Promise<Case> => {
  try {
    const doc = await database
      .collection(`clients/${clientId}/cases`)
      .doc(caseId)
      .get();
    return doc.data() as Case;
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

export const getAllCases = async (clientId: string): Promise<Case[]> => {
  try {
    const ref = await database.collection(`clients/${clientId}/cases`).get();
    return ref.docs.map(doc => doc.data() as Case);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling
  }
};

export const setCase = async (clientId: string, clientCase: Case) => {
  try {
    await database
      .collection(`clients/${clientId}/cases`)
      .doc(clientCase.id)
      .set(clientCase);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

export const addCase = async (clientId: string, clientCase: Case) => {
  try {
    await database.collection(`clients/${clientId}/cases`).add(clientCase);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

export const getDocument = async (
  clientId: string,
  caseId: string,
  documentId: string,
): Promise<Document> => {
  try {
    const doc = await database
      .collection(`clients/${clientId}/cases/${caseId}/documents`)
      .doc(documentId)
      .get();
    return doc.data() as Document;
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

export const getAllDocuments = async (
  clientId: string,
  caseId: string,
): Promise<Document[]> => {
  try {
    const ref = await database
      .collection(`clients/${clientId}/cases/${caseId}/documents`)
      .get();
    return ref.docs.map(doc => doc.data() as Document);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling
  }
};

export const setDocument = async (
  clientId: string,
  caseId: string,
  document: Document,
) => {
  try {
    await database
      .collection(`clients/${clientId}/cases/${caseId}/documents`)
      .doc(document.id)
      .set(document);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

export const addDocument = async (
  clientId: string,
  caseId: string,
  document: Document,
) => {
  try {
    await database
      .collection(`clients/${clientId}/cases/${caseId}/documents`)
      .add(document);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

export const getQuestion = async (questionId: string): Promise<Question> => {
  try {
    const doc = await questionCollection.doc(questionId).get();
    return doc.data() as Question;
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

export const getAllQuestions = async (): Promise<Question[]> => {
  try {
    const ref = await questionCollection.get();
    return ref.docs.map(doc => doc.data() as Question);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling
  }
};

export const setQuestion = async (question: Question) => {
  try {
    await questionCollection.doc(question.id).set(question);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

export const addQuestion = async (question: Question) => {
  try {
    await questionCollection.add(question);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};
