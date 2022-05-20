/* eslint-disable no-restricted-imports */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';
import { TextRegular } from 'assets/fonts/Fonts';
import { updateLanguage } from 'database/helpers';
import { RadioContainer, ButtonContainer } from './styles';

const LanguageRadio = ({ dictUpdate, stringUpdate }: any) => {
  const [value, setValue] = useState('');
  const languageOptions = ['English', 'Español', 'Tiếng Việt'];

  const onChange = (val: string): void => {
    updateLanguage(val, dictUpdate, stringUpdate);
    setValue(val);
  };

  return (
    <RadioContainer>
      {languageOptions.map(option => (
        <ButtonContainer key={option}>
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
};

export default LanguageRadio;
