/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { ContentContainer, ButtonView, TextInput } from './styles';
import {
  TextRegular,
  TextRegularWhite,
  TextRegularRed,
} from '../../assets/fonts/Fonts';
import { ButtonDark } from '../../assets/buttons/Buttons';
import { PageContainer } from '../styles';
import { register } from '../../firebase/auth';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [fullName, setFullName] = useState('');
  const [language, setLanguage] = useState('');

  const onRegister = (e: string, p: string, n: string) => {
    if (email === '' || password === '' || fullName === '' || language === '') {
      console.log('please fill in all inputs');
    } else if (password !== passwordRepeat) {
      console.log('passwords do not match');
    } else {
      register(e, p, n);
    }
  };

  return (
    <PageContainer>
      <ContentContainer>
        <TextRegular>
          Name <TextRegularRed>*</TextRegularRed>
        </TextRegular>
        <TextInput onChangeText={text => setFullName(text)} />
        <TextRegular>
          Email <TextRegularRed>*</TextRegularRed>
        </TextRegular>
        <TextInput onChangeText={text => setEmail(text)} />
        <TextRegular>
          Password <TextRegularRed>*</TextRegularRed>
        </TextRegular>
        <TextInput onChangeText={text => setPassword(text)} secureTextEntry />
        <TextRegular>
          Re-enter Password <TextRegularRed>*</TextRegularRed>
        </TextRegular>
        <TextInput
          onChangeText={text => setPasswordRepeat(text)}
          secureTextEntry
        />
        <TextRegular>
          Language preference <TextRegularRed>*</TextRegularRed>
        </TextRegular>
        <TextInput onChangeText={text => setLanguage(text)} />
      </ContentContainer>
      <ButtonView>
        <ButtonDark onPress={() => onRegister(email, password, fullName)}>
          <TextRegularWhite>Get started!</TextRegularWhite>
        </ButtonDark>
      </ButtonView>
    </PageContainer>
  );
};

export default RegisterScreen;
