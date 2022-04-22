/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { PageContainer } from 'screens/styles';
import { TextRegular, TextBold, TextRegularWhite } from 'assets/fonts/Fonts';
import { ButtonDark, ButtonLight } from 'assets/Components';
import {
  ContentContainer,
  TitleContainer,
  ButtonContainer,
  ButtonView,
} from './styles';
import { Text } from 'context/ContextProvider';

const FinalIntakeScreen = ({ navigation }: any) => {
  return (
    <PageContainer>
      <ContentContainer>
        <TitleContainer>
          <TextBold>{Text('successfully submitted intake')}</TextBold>
        </TitleContainer>
        <TextRegular>
          {Text('Please go upload your legal documents')}
        </TextRegular>
      </ContentContainer>
      <ButtonContainer>
        <ButtonView>
          <ButtonLight
            onPress={() => {
              navigation.navigate('TabsStack', { screen: 'Home' });
            }}
          >
            <TextRegular>{Text('Return Home')}</TextRegular>
          </ButtonLight>
        </ButtonView>
        <ButtonView>
          <ButtonDark
            onPress={() => {
              navigation.navigate('TabsStack', { screen: 'Upload' });
            }}
          >
            <TextRegularWhite>{Text('Upload')}</TextRegularWhite>
          </ButtonDark>
        </ButtonView>
      </ButtonContainer>
    </PageContainer>
  );
};

export default FinalIntakeScreen;
