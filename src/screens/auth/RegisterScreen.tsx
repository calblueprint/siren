/* eslint-disable no-restricted-imports */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';
import {
  TextRegular,
  TextRegularWhite,
  TextRegularRed,
  TextSubtitle,
} from 'assets/fonts/Fonts';
import { ButtonDark, TextInput } from 'assets/Components';
import { register } from 'database/auth';
import { Text } from 'context/ContextProvider';
import { PageContainer } from '../styles';
import { ContentContainer, ButtonView, ButtonHeader } from './styles';

const RegisterScreen = ({ route, navigation }: any) => {
  const { language } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [fullName, setFullName] = useState('');

  // TO DO: Apply text function to 

  function checkPassword(password1: string, password2: string): boolean {
    const hasLower = new RegExp('^(?=.*[a-z])');
    const hasUpper = new RegExp('^(?=.*[A-Z])');
    const hasNum = new RegExp('^(?=.*[0-9])');

    if (password1 !== password2) {
      alert('Passwords do not match');
    } else if (password1.length < 6) {
      alert('Password must be greater than 6 characters');
      return false;
    } else {
      if (hasLower.test(password1) === false) {
        alert('Password must contain lower case character');
        return false;
      }
      if (hasUpper.test(password1) === false) {
        alert('Password must contain upper case character');
        return false;
      }
      if (hasNum.test(password1) === false) {
        alert('Password must contain number');
        return false;
      }
    }
    return password === password2;
  }

  const onRegister = (e: string, p: string, n: string, lang: string) => {
    if (email === '' || password === '' || fullName === '' || lang === '') {
      alert('Please fill in all inputs');
    } else if (checkPassword(password, passwordRepeat)) {
      register(e, p, n, lang);
    } else {
      return null;
    }
  };

  const getBackHeader = () => (
    <ButtonHeader
      onPress={() =>
        navigation.navigate('Welcome', { languageParam: language })
      }
    >
      <Appbar.BackAction
        size={18}
        style={{ margin: 0 }}
        onPress={() =>
          navigation.navigate('Welcome', { languageParam: language })
        }
      />
      <TextSubtitle>{Text('Go Back')}</TextSubtitle>
    </ButtonHeader>
  );

  return (
    <PageContainer>
      {getBackHeader()}
      <ContentContainer>
        <TextRegular>
          {Text('Name')} <TextRegularRed>*</TextRegularRed>
        </TextRegular>
        <TextInput
          onChangeText={text => setFullName(text)}
          placeholder={Text('ex. Noah Alexander Hernandez')}
        />
        <TextRegular>
          {Text('Email')} <TextRegularRed>*</TextRegularRed>
        </TextRegular>
        <TextInput
          onChangeText={text => setEmail(text)}
          placeholder={Text('ex. example@example.com')}
        />
        <TextRegular>
          {Text('Password')} <TextRegularRed>*</TextRegularRed>
        </TextRegular>
        <TextRegular>
          Must contain at least 6 characters, 1 uppercase, 1 lowercase, and 1
          number
        </TextRegular>
        <TextInput onChangeText={text => setPassword(text)} secureTextEntry />
        <TextRegular>
          {Text('Re-enter Password')} <TextRegularRed>*</TextRegularRed>
        </TextRegular>
        <TextInput
          onChangeText={text => setPasswordRepeat(text)}
          secureTextEntry
        />
      </ContentContainer>
      <ButtonView>
        <ButtonDark
          onPress={() => onRegister(email, password, fullName, language)}
        >
          <TextRegularWhite>{Text('Get started!')}</TextRegularWhite>
        </ButtonDark>
      </ButtonView>
    </PageContainer>
  );
};

export default RegisterScreen;
