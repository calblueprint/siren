import React from 'react';
import { ScrollPageContainer, InnerPageContainer } from 'screens/styles';

const TestScreen = ({ navigation }: any) => {
  return (
    <ScrollPageContainer>
      <InnerPageContainer>
        <p>Hello</p>
      </InnerPageContainer>
    </ScrollPageContainer>
  );
};

export default TestScreen;
