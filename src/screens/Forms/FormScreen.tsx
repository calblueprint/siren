import React, { useEffect, useState } from 'react';
import GeneralQuestionManager from 'components/Questions/GeneralQuestionManager/GeneralQuestionManager';
import { ScrollPageContainer, InnerPageContainer } from 'screens/styles';
import { Client } from 'types/types';
import { ClientContext } from 'context/ContextProvider';
import AdditionalQuestionManager from 'components/Questions/AdditionalQuestionManager/AdditionalQuestionManager';

const FormsScreen = ({ navigation }: any) => {
  const [showAdditionalScreen, setShowAdditionalScreen] = useState(false);
  const [showGeneralScreen, setShowGeneralScreen] = useState(false);
  const [additionalScreenType, setAdditionalScreenType] = useState('');
  const [generalScreenNumber, setGeneralScreenNumber] = useState(0);
  const [existingAnswers, setExistingAnswers] = useState(new Map());
  const { state } = React.useContext(ClientContext);

  const loadClient = async (): Promise<void> => {
    const client: Client = state;
    if (client) {
      setExistingAnswers(client.answers);
    }
    // show general screen if everything is false
    setShowGeneralScreen(!showGeneralScreen && !showAdditionalScreen);
  };

  useEffect(() => {
    loadClient();
  }, []);

  const setAdditionalScreen = (visitReason: string): void => {
    loadClient();
    setAdditionalScreenType(visitReason);
    setShowAdditionalScreen(true);
    setShowGeneralScreen(false);
    setGeneralScreenNumber(5);
  };

  const setFinalScreen = (): void => {
    loadClient();
    setShowAdditionalScreen(false);
    setShowGeneralScreen(false);
    navigation.navigate('FinalIntake');
  };

  const setGeneralScreen = (): void => {
    loadClient();
    setAdditionalScreenType('');
    setShowAdditionalScreen(false);
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
              goBack={() =>
                navigation.navigate('TabsStack', { screen: 'Forms' })
              }
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
