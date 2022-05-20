import React from 'react';
import { Button } from 'react-native';
import { ScrollPageContainer, InnerPageContainer } from 'screens/styles';
import { logout } from 'database/auth';

const TestScreen = ({ navigation: { goBack } }: any) => {
  return (
    <ScrollPageContainer>
      <InnerPageContainer style={{ marginTop: 100 }}>
        <Button title="Go Back" onPress={() => goBack()} />
        <Button title="Logout" onPress={logout} />
      </InnerPageContainer>
    </ScrollPageContainer>
  );
};

export default TestScreen;
