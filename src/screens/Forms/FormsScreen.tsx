import { Text } from 'context/ContextProvider';
import React, { useEffect, useState } from 'react';
import { ScrollPageContainer, InnerPageContainer } from 'screens/styles';
import { getAllCases } from 'database/queries';
import { TextTitle, TextSubtitle } from 'assets/fonts/Fonts';
import firebase from 'firebase';
import { Case } from 'types/types';
import { ButtonHeader } from './styles';

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
  }, [cases]);

  return (
    <ScrollPageContainer>
      <InnerPageContainer>
        <ButtonHeader
          onPress={() => navigation.navigate('FormsStack', { screen: 'Form' })}
        >
          <TextSubtitle>{Text('Go to form')}</TextSubtitle>
        </ButtonHeader>
        <TextTitle>Your Cases</TextTitle>
        {/* {cases.length ? (
          Object.keys(cases).map((id: any) => (
            <ButtonHeader
              key={id}
              onPress={() =>
                navigation.navigate('FormsStack', {
                  screen: 'Update',
                  visitReason: cases[id].type,
                })
              }
            >
              <TextSubtitle>{caseTypes.get(cases[id].type)}</TextSubtitle>
            </ButtonHeader>
          ))
        ) : (
          <TextSubtitle>No Cases Yet</TextSubtitle>
        )} */}
      </InnerPageContainer>
    </ScrollPageContainer>
  );
};

export default FormsScreen;
