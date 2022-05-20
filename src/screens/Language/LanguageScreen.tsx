/* eslint-disable no-restricted-imports */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import { Image } from 'react-native';
import { TextRegular, TextRegularWhite } from 'assets/fonts/Fonts';
import { ButtonDark } from 'assets/Components';
import { TextRegularRed } from 'assets/fonts/Fonts';
import { LanguageContext, Text } from 'context/ContextProvider';
import Radio from 'components/LanguageRadio/LanguageRadio';
import { PageContainer } from '../styles';
import {
  ContentContainer,
  ButtonView,
  ImageStyles,
  ButtonContainer2,
} from './styles';

const sirenLogo = require('../../images/siren_logo.png');

const LanguageScreen = ({ navigation }: any) => {
  const { langUpdate } = useContext(LanguageContext); // dictionary type
  const [langStr, setLanguage] = useState('EN'); // string type

  return (
    <PageContainer>
      <ContentContainer>
        <Image style={ImageStyles.logo} source={sirenLogo} />
        <TextRegular>
          Please select your language preference
          <TextRegularRed>*</TextRegularRed>
        </TextRegular>
        <TextRegular>{Text('welcome')}</TextRegular>
        <Radio dictUpdate={langUpdate} stringUpdate={setLanguage} />
      </ContentContainer>
      <ButtonContainer2>
        <ButtonView>
          <ButtonDark
            onPress={
              // we pass langStr to Register/Login screens to update language in Firebase which is a string type - used for IntakeForm translations
              // comparatively, langState is a dictionary type used for static translations
              () => navigation.navigate('Welcome', { langStr })
            }
          >
            <TextRegularWhite>Continue</TextRegularWhite>
          </ButtonDark>
        </ButtonView>
      </ButtonContainer2>
    </PageContainer>
  );
};

export default LanguageScreen;
