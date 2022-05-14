import React, { useEffect, useState } from 'react';
import GeneralQuestionManager from 'components/Questions/GeneralQuestionManager/GeneralQuestionManager';
import { ScrollPageContainer, InnerPageContainer } from 'screens/styles';
import { Client } from 'types/types';
import { ClientContext } from 'context/ContextProvider';
import AdditionalQuestionManager from 'components/Questions/AdditionalQuestionManager/AdditionalQuestionManager';

const FormsScreen = ({ navigation }: any) => {
  const [additionalScreenType, setAdditionalScreenType] = useState('');
  const [existingAnswers, setExistingAnswers] = useState(new Map());
  const { state } = React.useContext(ClientContext);

  const loadClient = async (): Promise<void> => {
    const client: Client = state;
    if (client) {
      setExistingAnswers(client.answers);
    }
  };

  const setFinalScreen = (): void => {
    loadClient();
    navigation.navigate('FinalIntake');
  };

  useEffect(() => {
    loadClient();
  }, []);

  const getCurrentScreen = () => {
    return (
      <ScrollPageContainer>
        <InnerPageContainer>
          <AdditionalQuestionManager
            setPreviousScreen={undefined}
            setNextScreen={setFinalScreen}
            existingAnswers={existingAnswers}
            managerSpecificProps={{ caseType: additionalScreenType }}
          />
        </InnerPageContainer>
      </ScrollPageContainer>
    );
  };

  return getCurrentScreen();
};

export default FormsScreen;
