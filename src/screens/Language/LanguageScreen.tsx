/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { PageContainer } from 'screens/styles';
import { Image } from 'react-native';
import { TextRegular, TextBold, TextRegularWhite } from 'assets/fonts/Fonts';
import { ButtonDark, ButtonLight } from 'assets/Components';
import { TextRegularRed } from 'assets/fonts/Fonts';
import { RadioButton } from 'react-native-paper';
import { TextContainer, TextDescription } from 'components/Inputs/styles';
import {
  RadioContainer,
  ContentContainer,
  TitleContainer,
  ButtonContainer,
  ButtonView,
  ImageStyles,
  ButtonContainer2,
} from './styles';

const sirenLogo = require('../../images/siren_logo.png');

const languageOptions = ['English', 'Español', 'Tiếng Việt'];

function Radio() {
  const [value, setValue] = useState('English');

  const onChange = (val: any): void => {
    setValue(val);
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
  return (
    <PageContainer>
      <ContentContainer>
        <Image style={ImageStyles.logo} source={sirenLogo} />
        <TextRegular>
          Please select your language preference
          <TextRegularRed>*</TextRegularRed>
        </TextRegular>
        <Radio />
      </ContentContainer>
      <ButtonContainer2>
        <ButtonView>
          <ButtonDark onPress={() => navigation.navigate('Welcome')}>
            <TextRegularWhite>Continue</TextRegularWhite>
          </ButtonDark>
        </ButtonView>
      </ButtonContainer2>
    </PageContainer>
  );
};

export default LanguageScreen;
