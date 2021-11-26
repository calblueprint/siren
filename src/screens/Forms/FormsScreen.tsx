import React, { useEffect, useState } from 'react';
import GeneralQuestionManager from 'components/GeneralQuestionManager/GeneralQuestionManager';
import { ScrollPageContainer } from 'screens/styles';
import DacaRenewalQuestionManager from 'components/DacaRenewalQuestionManager/DacaRenewalQuestionManager';
import { Client, Dictionary } from 'types/types';
import { getCurrentClient } from 'database/auth';
import FinalIntakeScreen from 'components/FinalIntakeScreen/FinalIntakeScreen';

// TODO: integrate user auth, retention of answers.

const FormsScreen = () => {
  const [showAdditionalScreen, setShowAdditionalScreen] = useState(false);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [showGeneralScreen, setShowGeneralScreen] = useState(true);
  const [additionalScreenType, setAdditionalScreenType] = useState('');
  const [generalScreenNumber, setGeneralScreenNumber] = useState(0);
  const [existingAnswers, setExistingAnswers] = useState(new Map());

  const loadClient = async (): Promise<void> => {
    const client: Client | undefined = await getCurrentClient();
    if (client) {
      setExistingAnswers(client.answers);
    }
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
        <GeneralQuestionManager
          setNextScreen={setAdditionalScreen}
          existingAnswers={existingAnswers}
          managerSpecificProps={{ screen: generalScreenNumber }}
        />
      );
    }
    if (showFinalScreen) {
      return <FinalIntakeScreen />;
    }

    if (showAdditionalScreen) {
      const additionalScreenComponents: Dictionary = {
        'DACA renewal': DacaRenewalQuestionManager,
        // TODO: citizenship etc...
      };
      if (!(additionalScreenType in additionalScreenComponents)) {
        // TODO: add error screen
        return null;
      }
      const AdditionalScreenComponent =
        additionalScreenComponents[additionalScreenType];
      return (
        <AdditionalScreenComponent
          setPreviousScreen={setGeneralScreen}
          setNextScreen={setFinalScreen}
          existingAnswers={existingAnswers}
        />
      );
    }
    return null;
  };

  return <ScrollPageContainer>{getCurrentScreen()}</ScrollPageContainer>;
};

export default FormsScreen;
