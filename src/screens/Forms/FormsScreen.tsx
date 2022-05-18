import { Text } from 'context/ContextProvider';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { ScrollPageContainer, InnerPageContainer } from 'screens/styles';
import { getAllCases } from 'database/queries';
import { TextTitle, TextSubtitle } from 'assets/fonts/Fonts';
import firebase from 'firebase';
import { Case } from 'types/types';
import { ButtonHeader } from 'screens/auth/styles';
import { Appbar } from 'react-native-paper';

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
          <Appbar.BackAction size={18} style={{ margin: 0 }} />
          <TextSubtitle>{Text('Go Back')}</TextSubtitle>
        </ButtonHeader>
        <TextTitle>Your Cases</TextTitle>
        {cases.length !== 0 ? (
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
              <Appbar.BackAction size={18} style={{ margin: 0 }} />
              <TextSubtitle>{Text('Go Back')}</TextSubtitle>
            </ButtonHeader>
          ))
        ) : (
          <TextSubtitle>No Cases Yet</TextSubtitle>
        )}
      </InnerPageContainer>
    </ScrollPageContainer>
  );
};

export default FormsScreen;
