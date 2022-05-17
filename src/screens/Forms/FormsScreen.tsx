import { Text } from 'context/ContextProvider';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { ScrollPageContainer, InnerPageContainer } from 'screens/styles';
import { getAllCases } from 'database/queries';
import { TextTitle } from 'assets/fonts/Fonts';
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
  const [cases, setCases] = useState<Case[]>([]);
  const loadCases = async (): Promise<void> => {
    const clientCases = await getAllCases(uid as string);
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
        <TextTitle>Your Cases</TextTitle>
        {cases.length !== 0 ? (
          Object.keys(cases).map((id: any) => (
            <Button
              key={id}
              title={caseTypes.get(cases[id].type) as string}
              onPress={() =>
                navigation.navigate('FormsStack', {
                  screen: 'Update',
                  visitReason: cases[id].type,
                })
              }
            />
          ))
        ) : (
          <TextTitle>No Cases Yet</TextTitle>
        )}
      </InnerPageContainer>
    </ScrollPageContainer>
  );
};

export default FormsScreen;
