import firebase from './clientApp';

export const getAllClients = async (): Promise<
  firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
> => {
  const colSnap: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> =
    await firebase.firestore().collection('clients').get();
  return colSnap;
};

export const getClientByID = async (
  clientID: string,
): Promise<
  firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
> => {
  const docSnap: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> =
    await firebase.firestore().collection('clients').doc(clientID).get();
  return docSnap;
};

export const getAllCasesByID = async (
  clientID: string,
): Promise<
  firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
> => {
  const colSnap: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> =
    await firebase.firestore().collection(`clients/${clientID}/cases`).get();
  return colSnap;
};

export const getCaseByID = async (
  clientID: string,
  caseID: string,
): Promise<
  firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
> => {
  const docSnap: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> =
    await firebase
      .firestore()
      .collection(`clients/${clientID}/cases`)
      .doc(caseID)
      .get();
  return docSnap;
};

export const getAllDocumentsByID = async (
  clientID: string,
  caseID: string,
): Promise<
  firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
> => {
  const colSnap: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> =
    await firebase
      .firestore()
      .collection(`clients/${clientID}/cases/${caseID}/documents`)
      .get();
  return colSnap;
};

export const getDocumentByID = async (
  clientID: string,
  caseID: string,
  documentID: string,
): Promise<
  firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
> => {
  const docSnap: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> =
    await firebase
      .firestore()
      .collection(`clients/${clientID}/cases/${caseID}/documents`)
      .doc(documentID)
      .get();
  return docSnap;
};
