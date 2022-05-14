import { Text } from 'context/ContextProvider';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { ScrollPageContainer, InnerPageContainer } from 'screens/styles';
import { getAllCases } from 'database/queries.tsx';
import firebase from 'firebase';

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
    const clientCases = await getAllCases(uid);
    setCases(clientCases);
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
        {cases.map(c => (
          <Button
            key={c.id}
            title={caseTypes.get(c.type)}
            onPress={() =>
              navigation.navigate('FormsStack', { screen: 'Form' })
            }
          />
        ))}
      </InnerPageContainer>
    </ScrollPageContainer>
  );
};

export default FormsScreen;
