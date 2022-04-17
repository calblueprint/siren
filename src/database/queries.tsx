/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
import {
  Appointment,
  CalendlyLink,
  Case,
  CaseStatus,
  Client,
  Dictionary,
  Document,
  Question,
} from 'types/types';
import firebase from 'database/clientApp';
import { objectToMap, mapToObject, firestoreAutoId } from 'database/helpers';

const database = firebase.firestore();
const clientCollection = database.collection('clients');
const appointmentCollection = database.collection('appointments');

export const getClient = async (clientId: string): Promise<Client> => {
  try {
    const doc = await clientCollection.doc(clientId).get();
    const client = doc.data() as Client;
    if (client && client.answers) {
      client.answers = objectToMap(client.answers);
    }
    return client;
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
    const copy = { ...client } as Dictionary;
    copy.answers = mapToObject(client.answers);
    await clientCollection.doc(copy.id).set(copy);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

// export const deleteClient = async (client: Client) => {
//   try {
//     const cases: Case[] = await getAllCases(client.id);
//     const promises = [];
//     for (let i = 0; i < cases.length; i += 1) {
//       promises.push(deleteCase(client.id, cases[i]));
//     }
//     await Promise.all(promises);
//     await clientCollection.doc(client.id).delete();
//   } catch (e) {
//     console.warn(e);
//     throw e;
//     // TODO: Add error handling.
//   }
// };

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

export const getQuestion = async (
  questionId: string,
  caseType: string,
): Promise<Question> => {
  try {
    const doc = await database
      .collection(`caseTypes/${caseType}/questions`)
      .doc(questionId)
      .get();
    return doc.data() as Question;
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

export const getAllQuestionsOfType = async (
  caseType: string,
): Promise<Question[]> => {
  try {
    const ref = await database
      .collection(`caseTypes/${caseType}/questions`)
      .orderBy('order')
      .get();
    return ref.docs.map(doc => doc.data() as Question);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling
  }
};

/*
questionType could be seen as a legacy field from when we needed it for
root level question collection, could refactor this function to make it take a caseType: string instead
*/
export const setQuestion = async (question: Question) => {
  try {
    await database
      .collection(`caseTypes/${question.questionType}/questions`)
      .doc(question.id)
      .set(question);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

export const deleteQuestion = async (question: Question) => {
  try {
    await database
      .collection(`caseTypes/${question.questionType}/questions`)
      .doc(question.id)
      .delete();
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

export const getAllUpcomingAppointmentsForClient = async (
  client: Client,
): Promise<Appointment[]> => {
  try {
    const ref = await appointmentCollection
      .where('clientEmail', '==', client.email)
      .get();

    // generate list of Appointment objects
    const appointments: Appointment[] = ref.docs.map(doc => {
      const data = doc.data();
      const date = new Date(data.startTime);
      const a: Appointment = {
        id: data.caseType + date.toString(),
        caseType: data.caseType,
        client: data.client,
        clientEmail: data.clientEmail,
        startTime: date,
      };
      return a;
    });

    // remove cancelled appointments, which have duplicate entries in Firebase
    // remove past appointments
    const activeMap = new Map<string, Appointment>();
    const now = new Date();
    appointments.forEach(a => {
      if (a.startTime >= now) {
        if (activeMap.has(a.id)) {
          activeMap.delete(a.id);
        } else {
          activeMap.set(a.id, a);
        }
      }
    });

    // return upcoming appointments sorted by start time
    return Array.from(activeMap.values()).sort((a, b) => {
      return a.startTime < b.startTime ? -1 : 1;
    });
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling
  }
};

export const getCalendlyLink = async (
  caseType: string,
): Promise<CalendlyLink> => {
  try {
    const doc = await database.collection('caseTypes').doc(caseType).get();
    const ret = { type: caseType, link: doc.data()?.calendlyLink as string };
    return ret as CalendlyLink;
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling
  }
};

export const getDocList = async (caseType: string): Promise<string[]> => {
  try {
    const doc = await database.collection('caseTypes').doc(caseType).get();
    return doc.data()?.documentList as string[];
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

export const getCaseTypeFromKey = async (
  visitReason: string,
): Promise<string> => {
  try {
    const ref = await database
      .collection('caseTypes')
      .where('key', '==', visitReason)
      .get();
    return ref.docs[0].id;
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

export const setCaseAndNumCases = async (
  clientId: string,
  caseType: string,
) => {
  try {
    // need to make these operations atomic (transaction) to avoid concurrent writes
    await database.runTransaction(async t => {
      const clientCase: Case = {
        id: firestoreAutoId(),
        status: CaseStatus.SubmitDoc,
        type: caseType,
        identifier: '',
      };
      const generalRef = database.collection('caseTypes').doc('general'); // store total number of cases under general
      const caseTypeRef = database.collection('caseTypes').doc(caseType);
      const generalDoc = await t.get(generalRef);
      const caseTypeDoc = await t.get(caseTypeRef);
      const newNumCases = generalDoc.data()?.numCases + 1;
      const identifier = caseTypeDoc.data()?.identifier;
      clientCase.identifier = `${identifier}-${newNumCases}`;
      t.update(generalRef, { numCases: newNumCases });
      await setCase(clientId, clientCase);
    });
  } catch (e) {
    console.warn(e);
    throw e;
  }
};
