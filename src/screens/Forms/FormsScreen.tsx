import React from 'react';
import GeneralQuestionManager from 'components/GeneralQuestionManager/GeneralQuestionManager';
import UploadScreen from 'screens/Upload/UploadScreen';
import { ScrollPageContainer, PageContainer } from 'screens/styles';

const FormsScreen = () => {
  return (
    <PageContainer>
      <UploadScreen />
    </PageContainer>
    // <ScrollPageContainer>
    //   <GeneralQuestionManager />
    // </ScrollPageContainer>
  );
};

export default FormsScreen;
