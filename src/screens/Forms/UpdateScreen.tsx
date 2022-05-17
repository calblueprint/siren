import React, { useEffect, useState } from 'react';
import { ScrollPageContainer, InnerPageContainer } from 'screens/styles';
import { Client } from 'types/types';
import { ClientContext } from 'context/ContextProvider';
import AdditionalQuestionManager from 'components/Questions/AdditionalQuestionManager/AdditionalQuestionManager';

const UpdateScreen = ({ route, navigation }: any) => {
  const { visitReason } = route.params;
  const additionalScreenType = visitReason;
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
            setPreviousScreen={() =>
              navigation.navigate('TabsStack', { screen: 'Forms' })
            }
            setNextScreen={setFinalScreen}
            existingAnswers={existingAnswers}
            managerSpecificProps={{ caseType: additionalScreenType }}
            isUpdating
          />
        </InnerPageContainer>
      </ScrollPageContainer>
    );
  };

  return getCurrentScreen();
};

export default UpdateScreen;
