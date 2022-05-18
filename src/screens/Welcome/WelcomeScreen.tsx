/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { Appbar } from 'react-native-paper';
import { Image } from 'react-native';
import {
  TextRegular,
  TextBold,
  TextRegularWhite,
  TextSubtitle,
} from 'assets/fonts/Fonts';
import { ButtonDark, ButtonLight } from 'assets/Components';
// eslint-disable-next-line no-restricted-imports
import { PageContainer } from '../styles';
import {
  ContentContainer,
  TitleContainer,
  ButtonContainer,
  ButtonView,
  ImageStyles,
  ButtonHeader,
} from './styles';
// eslint-disable-next-line no-restricted-imports
import { LanguageContext, Text } from '../../context/ContextProvider';

const sirenLogo = require('../../images/siren_logo.png');

const WelcomeScreen = ({ route, navigation }: any) => {
  // const { languageParam } = route.params;
  const { langState, langUpdate } = useContext(LanguageContext);

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
          <TextBold>{Text('Welcome to the SIREN App!')}</TextBold>
        </TitleContainer>
        <TextRegular>{Text('this app is a digital aid')}</TextRegular>
      </ContentContainer>
      <ButtonContainer>
        <ButtonView>
          <ButtonLight onPress={() => navigation.navigate('Login')}>
            <TextRegular>{Text('Log in')}</TextRegular>
          </ButtonLight>
        </ButtonView>
        <ButtonView>
          <ButtonDark
            onPress={() =>
              navigation.navigate('Register', { language: langState })
            }
          >
            <TextRegularWhite>{Text('Register')}</TextRegularWhite>
          </ButtonDark>
        </ButtonView>
      </ButtonContainer>
    </PageContainer>
  );
};

export default WelcomeScreen;
