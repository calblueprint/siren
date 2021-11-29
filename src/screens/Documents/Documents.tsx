import React from 'react';
import { TextRegular } from 'assets/fonts/Fonts';
import { PageContainer } from 'screens/styles';
import  DocHolder  from '/components/DocHolder';
import  DocContainer  from '/components/DocContainer';

const UploadScreen = () => {
  return (
    <PageContainer>
      <TextRegular>Upload your necessary documents!</TextRegular>
      <DocContainer caseType='DACA' uploadStatus={ true }></DocContainer>
    </PageContainer>
  );
};

export default UploadScreen;
