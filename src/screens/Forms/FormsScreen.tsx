import React, { useEffect, useState } from 'react';
import GeneralQuestionManager from 'components/GeneralQuestionManager/GeneralQuestionManager';
import { ScrollPageContainer } from 'screens/styles';
import DacaRenewalQuestionManager from 'components/DacaRenewalQuestionManager/DacaRenewalQuestionManager';
import { Client, Dictionary } from 'types/types';
import { getClient } from 'database/queries';

// TODO: integrate user auth, retention of answers.

const FormsScreen = () => {
  const [showAdditionalScreen, setShowAdditionalScreen] = useState(false);
  const [additionalScreenType, setAdditionalScreenType] = useState('');
  const [existingAnswers, setExistingAnswers] = useState(new Map());

  const loadClient = async (): Promise<void> => {
    const client: Client = await getClient('sample');
    setExistingAnswers(client.answers);
  };

  useEffect(() => {
    loadClient();
  }, []);

  const setAdditionalScreen = (visitReason: string): void => {
    setAdditionalScreenType(visitReason);
    setShowAdditionalScreen(true);
  };

  const setGeneralScreen = (): void => {
    setAdditionalScreenType('');
    setShowAdditionalScreen(false);
  };

  const getCurrentScreen = () => {
    if (!showAdditionalScreen) {
      return (
        <GeneralQuestionManager
          setNextScreen={setAdditionalScreen}
          existingAnswers={existingAnswers}
        />
      );
    }
    const additionalScreenComponents: Dictionary = {
      'DACA renewal': DacaRenewalQuestionManager,
      // TODO: citizenship etc...
    };
    if (!(additionalScreenType in additionalScreenComponents)) {
      return null;
    }
    const AdditionalScreenComponent =
      additionalScreenComponents[additionalScreenType];
    return (
      <AdditionalScreenComponent
        setNextScreen={setGeneralScreen}
        existingAnswers={existingAnswers}
      />
    );
  };
  return <ScrollPageContainer>{getCurrentScreen()}</ScrollPageContainer>;
};

export default FormsScreen;
