/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import { EventSubscriptionVendor, Image } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { TextRegular, TextRegularWhite } from 'assets/fonts/Fonts';
import { ButtonDark } from 'assets/Components';
import { TextRegularRed } from 'assets/fonts/Fonts';
// eslint-disable-next-line no-restricted-imports
import { dictionaryList } from 'multilingual';
import { Dictionary } from 'types/types';
import { PageContainer } from '../styles';
import {
  RadioContainer,
  ContentContainer,
  ButtonContainer,
  ButtonView,
  ImageStyles,
  ButtonContainer2,
} from './styles';
// eslint-disable-next-line no-restricted-imports
import { LanguageContext, Text } from '../../context/ContextProvider';

const sirenLogo = require('../../images/siren_logo.png');

const languageOptions = ['English', 'Español', 'Tiếng Việt'];

function Radio({ handleRadioFunc }: any) {
  const [value, setValue] = useState('English');

  const onChange = (val: string): void => {
    setValue(val);
    handleRadioFunc(val);
  };

  return (
    <RadioContainer>
      {languageOptions.map((option, key) => (
        // eslint-disable-next-line react/no-array-index-key
        <ButtonContainer key={key}>
          <RadioButton.Android
            color="black"
            value={option}
            status={value === option ? 'checked' : 'unchecked'}
            onPress={() => onChange(option)}
          />
          <TextRegular onPress={() => onChange(option)}>{option}</TextRegular>
        </ButtonContainer>
      ))}
    </RadioContainer>
  );
}

const LanguageScreen = ({ navigation }: any) => {
  const { langState, langUpdate } = useContext(LanguageContext);
  const [langCode, setLangCode] = useState('EN');

  const handleRadio = (val: string): void => {
    if (val === 'Español') {
      langUpdate(dictionaryList.ES);
      setLangCode('ES');
    }
    if (val === 'Tiếng Việt') {
      langUpdate(dictionaryList.VIET);
      setLangCode('VIET');
    }
    if (val === 'English') {
      langUpdate(dictionaryList.EN);
      setLangCode('EN');
    }
    console.log(langCode);
  };

  return (
    <PageContainer>
      <ContentContainer>
        <Image style={ImageStyles.logo} source={sirenLogo} />
        <TextRegular>
          Please select your language preference
          <TextRegularRed>*</TextRegularRed>
        </TextRegular>
        <TextRegular>{Text('welcome')}</TextRegular>
        <Radio handleRadioFunc={handleRadio} />
      </ContentContainer>
      <ButtonContainer2>
        <ButtonView>
          <ButtonDark
            onPress={
              () => navigation.navigate('Welcome', { langCode }) // is this necessary?
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
