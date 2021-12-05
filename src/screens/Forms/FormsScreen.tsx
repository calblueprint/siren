import React from 'react';
import { Button } from 'react-native';
import { ScrollPageContainer, InnerPageContainer } from 'screens/styles';

// TODO: integrate user auth, retention of answers.

const FormsScreen = ({ navigation }: any) => {
  return (
    <ScrollPageContainer>
      <InnerPageContainer>
        <Button
          title="Go to form"
          onPress={() => navigation.navigate('FormsStack', { screen: 'Form' })}
        />
      </InnerPageContainer>
    </ScrollPageContainer>
  );
};

export default FormsScreen;
