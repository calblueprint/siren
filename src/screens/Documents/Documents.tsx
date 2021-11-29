import React from 'react';
import { TextRegular } from 'assets/fonts/Fonts';
import { PageContainer } from 'screens/styles';
import DocContainer from 'components/DocContainer';

const UploadScreen = () => {
  return (
    <PageContainer>
      <TextRegular>Upload your necessary documents!</TextRegular>
      <DocContainer caseType="DACA" uploadStatus />
    </PageContainer>
  );
};

export default UploadScreen;
