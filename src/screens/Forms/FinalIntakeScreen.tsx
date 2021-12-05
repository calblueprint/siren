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

const FinalIntakeScreen = ({ navigation }: any) => {
  return (
    <PageContainer>
      <ContentContainer>
        <TitleContainer>
          <TextBold>Your intake form has been successfully submitted!</TextBold>
        </TitleContainer>
        <TextRegular>
          Please go upload your legal documents needed to properly assess your
          case. If you do not have your documents on hand at this time...
        </TextRegular>
      </ContentContainer>
      <ButtonContainer>
        <ButtonView>
          <ButtonLight
            onPress={() => {
              navigation.navigate('TabsStack', { screen: 'Home' });
            }}
          >
            <TextRegular>Return Home</TextRegular>
          </ButtonLight>
        </ButtonView>
        <ButtonView>
          <ButtonDark
            onPress={() => {
              navigation.navigate('TabsStack', { screen: 'Upload' });
            }}
          >
            <TextRegularWhite>Upload</TextRegularWhite>
          </ButtonDark>
        </ButtonView>
      </ButtonContainer>
    </PageContainer>
  );
};

export default FinalIntakeScreen;
