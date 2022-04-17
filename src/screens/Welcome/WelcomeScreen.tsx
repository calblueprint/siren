/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Appbar } from 'react-native-paper';
import { PageContainer } from 'screens/styles';
import { Image } from 'react-native';
import {
  TextRegular,
  TextBold,
  TextRegularWhite,
  TextSubtitle,
} from 'assets/fonts/Fonts';
import { ButtonDark, ButtonLight } from 'assets/Components';
import { RotationGestureHandler } from 'react-native-gesture-handler';
import { TabRouter } from '@react-navigation/native';
import {
  ContentContainer,
  TitleContainer,
  ButtonContainer,
  ButtonView,
  ImageStyles,
  ButtonHeader,
} from './styles';
// eslint-disable-next-line no-restricted-imports
import { Text } from '../../context/ContextProvider';

const sirenLogo = require('../../images/siren_logo.png');

const WelcomeScreen = ({ route, navigation }: any) => {
  const { languageParam } = route.params;

  const getBackHeader = () => (
    <ButtonHeader onPress={() => navigation.navigate('Language')}>
      <Appbar.BackAction
        size={18}
        style={{ margin: 0 }}
        onPress={() => navigation.navigate('Language')}
      />
      <TextSubtitle>Go Back</TextSubtitle>
    </ButtonHeader>
  );

  return (
    <PageContainer>
      {getBackHeader()}
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
          <ButtonLight
            onPress={() =>
              navigation.navigate('Login', { language: languageParam })
            }
          >
            <TextRegular>Log in</TextRegular>
          </ButtonLight>
        </ButtonView>
        <ButtonView>
          <ButtonDark
            onPress={() =>
              navigation.navigate('Register', { language: languageParam })
            }
          >
            <TextRegularWhite>Register</TextRegularWhite>
          </ButtonDark>
        </ButtonView>
      </ButtonContainer>
    </PageContainer>
  );
};

export default WelcomeScreen;
