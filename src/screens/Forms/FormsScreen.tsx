import React, { useEffect, useState } from 'react';
import GeneralQuestionManager from 'components/GeneralQuestionManager/GeneralQuestionManager';
import { ScrollPageContainer, InnerPageContainer } from 'screens/styles';
import { Client } from 'types/types';
import { getCurrentClient } from 'database/auth';
import FinalIntakeScreen from 'screens/Forms/FinalIntakeScreen';
import AdditionalQuestionManager from 'components/AdditionalQuestionManager/AdditionalQuestionManager';

// TODO: integrate user auth, retention of answers.

const FormsScreen = ({ navigation }: any) => {
  const [showAdditionalScreen, setShowAdditionalScreen] = useState(false);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [showGeneralScreen, setShowGeneralScreen] = useState(false);
  const [additionalScreenType, setAdditionalScreenType] = useState('');
  const [generalScreenNumber, setGeneralScreenNumber] = useState(0);
  const [existingAnswers, setExistingAnswers] = useState(new Map());

  const loadClient = async (): Promise<void> => {
    const client: Client | undefined = await getCurrentClient();
    if (client) {
      setExistingAnswers(client.answers);
    }
    // show general screen if everything is false
    setShowGeneralScreen(
      !showGeneralScreen && !showAdditionalScreen && !showFinalScreen,
    );
  };

  useEffect(() => {
    loadClient();
  }, []);

  const setAdditionalScreen = (visitReason: string): void => {
    loadClient();
    setAdditionalScreenType(visitReason);
    setShowAdditionalScreen(true);
    setShowGeneralScreen(false);
    setShowFinalScreen(false);
    setGeneralScreenNumber(5);
  };

  const setFinalScreen = (): void => {
    loadClient();
    setShowFinalScreen(true);
    setShowAdditionalScreen(false);
    setShowGeneralScreen(false);
    // navigation.navigate(...)
  };

  const setGeneralScreen = (): void => {
    loadClient();
    setAdditionalScreenType('');
    setShowAdditionalScreen(false);
    setShowFinalScreen(false);
    setShowGeneralScreen(true);
  };

  const getCurrentScreen = () => {
    if (showGeneralScreen) {
      return (
        <ScrollPageContainer>
          <InnerPageContainer>
            <GeneralQuestionManager
              setNextScreen={setAdditionalScreen}
              existingAnswers={existingAnswers}
              managerSpecificProps={{ screen: generalScreenNumber }}
            />
          </InnerPageContainer>
        </ScrollPageContainer>
      );
    }

    if (showAdditionalScreen) {
      return (
        <ScrollPageContainer>
          <InnerPageContainer>
            <AdditionalQuestionManager
              setPreviousScreen={setGeneralScreen}
              setNextScreen={setFinalScreen}
              existingAnswers={existingAnswers}
              managerSpecificProps={{ visitReason: additionalScreenType }}
            />
          </InnerPageContainer>
        </ScrollPageContainer>
      );
    }
    return null;
  };

  return getCurrentScreen();
};

export default FormsScreen;
