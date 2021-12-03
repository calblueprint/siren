import React from 'react';
import { Button } from 'react-native';
import { ScrollPageContainer, InnerPageContainer } from 'screens/styles';

const TestScreen = ({ navigation: { goBack } }: any) => {
  return (
    <ScrollPageContainer>
      <InnerPageContainer>
        <p>Hello</p>
        <Button title="Go Back" onPress={() => goBack()} />
      </InnerPageContainer>
    </ScrollPageContainer>
  );
};

export default TestScreen;
