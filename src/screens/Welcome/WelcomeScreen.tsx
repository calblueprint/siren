/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { PageContainer } from 'screens/styles';
import { Image } from 'react-native';
import { TextRegular, TextBold, TextRegularWhite } from 'assets/fonts/Fonts';
import { ButtonDark, ButtonLight } from 'assets/Components';
import {
  ContentContainer,
  TitleContainer,
  ButtonContainer,
  ButtonView,
  ImageStyles,
} from './styles';

const sirenLogo = require('../../images/siren_logo.png');

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <PageContainer>
      <ContentContainer>
        <Image style={ImageStyles.logo} source={sirenLogo} />
        <TitleContainer>
          <TextBold>Welcome to the SIREN App!</TextBold>
        </TitleContainer>
        <TextRegular>
          This app is a digital aid to the legal processes SIREN will be
          handling for you. You can submit intake forms, keep track of your
          cases, upload documents, and schedule appointments with your attorney
          here!
        </TextRegular>
      </ContentContainer>
      <ButtonContainer>
        <ButtonView>
          <ButtonLight onPress={() => navigation.navigate('Login')}>
            <TextRegular>Log in</TextRegular>
          </ButtonLight>
        </ButtonView>
        <ButtonView>
          <ButtonDark onPress={() => navigation.navigate('Register')}>
            <TextRegularWhite>Register</TextRegularWhite>
          </ButtonDark>
        </ButtonView>
      </ButtonContainer>
    </PageContainer>
  );
};

export default WelcomeScreen;
