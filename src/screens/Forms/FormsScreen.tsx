import { Text } from 'context/ContextProvider';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { ScrollPageContainer, InnerPageContainer } from 'screens/styles';
import { getAllCases } from 'database/queries';
import firebase from 'firebase';
import { Case } from 'types/types';

// TODO: integrate user auth, retention of answers.

const caseTypes = new Map<string, string>([
  ['I90', 'I-90'],
  ['adjustmentOfStatus', 'Adjustment of status'],
  ['citizenship', 'Citizenship'],
  ['dacaRenewal', 'DACA renewal'],
]);

const FormsScreen = ({ navigation }: any) => {
  const uid = firebase.auth().currentUser?.uid;
  const [cases, setCases] = useState([]);
  const loadCases = async (): Promise<void> => {
    const clientCases = await getAllCases(uid as string);
    setCases(clientCases as never[]);
  };
  useEffect(() => {
    loadCases();
  }, []);
  return (
    <ScrollPageContainer>
      <InnerPageContainer>
        <Button
          key="form"
          title={Text('Go to form')}
          onPress={() => navigation.navigate('FormsStack', { screen: 'Form' })}
        />
        <div>Your Cases:</div>
        {cases.length !== 0 ? (
          Object.keys(cases).map((id: any) => (
            <Button
              key={id}
              title={caseTypes.get((cases[id] as Case).type) as string}
              onPress={() =>
                navigation.navigate('FormsStack', {
                  screen: 'Update',
                  visitReason: (cases[id] as Case).type,
                })
              }
            />
          ))
        ) : (
          <p>No cases yet.</p>
        )}
      </InnerPageContainer>
    </ScrollPageContainer>
  );
};

export default FormsScreen;
