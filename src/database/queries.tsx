/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
import { Client, Case, Document, Question } from 'types/types';
import firebase from 'database/clientApp';

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

export const deleteClient = async (client: Client) => {
  try {
    const cases: Case[] = await getAllCases(client.id);
    const promises = [];
    for (let i = 0; i < cases.length; i += 1) {
      promises.push(deleteCase(client.id, cases[i]));
    }
    await Promise.all(promises);
    await clientCollection.doc(client.id).delete();
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

export const deleteCase = async (clientId: string, clientCase: Case) => {
  try {
    const documents: Document[] = await getAllDocuments(
      clientId,
      clientCase.id,
    );
    await documents.map(doc => deleteDocument(clientId, clientCase.id, doc));
    await database
      .collection(`clients/${clientId}/cases`)
      .doc(clientCase.id)
      .delete();
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

export const deleteDocument = async (
  clientId: string,
  caseId: string,
  document: Document,
) => {
  try {
    await database
      .collection(`clients/${clientId}/cases/${caseId}/documents`)
      .doc(document.id)
      .delete();
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

export const deleteQuestion = async (question: Question) => {
  try {
    await questionCollection.doc(question.id).delete();
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};
