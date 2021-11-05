/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';
import { ContentContainer, ButtonView, ButtonHeader } from './styles';
import {
  TextRegular,
  TextRegularWhite,
  TextRegularRed,
  TextSubtitle,
} from '../../assets/fonts/Fonts';
import { ButtonDark, TextInput } from '../../assets/Components';
import { PageContainer } from '../styles';
import { register } from '../../firebase/auth';

const RegisterScreen = ({ navigation }: any) => {
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

  const getBackHeader = () => (
    <ButtonHeader onPress={() => navigation.navigate('Welcome')}>
      <Appbar.BackAction
        size={18}
        style={{ margin: 0 }}
        onPress={() => navigation.navigate('Welcome')}
      />
      <TextSubtitle>Go Back</TextSubtitle>
    </ButtonHeader>
  );

  return (
    <PageContainer>
      {getBackHeader()}
      <ContentContainer>
        <TextRegular>
          Name <TextRegularRed>*</TextRegularRed>
        </TextRegular>
        <TextInput
          onChangeText={text => setFullName(text)}
          placeholder="ex. Noah Alexander Hernandez"
        />
        <TextRegular>
          Email <TextRegularRed>*</TextRegularRed>
        </TextRegular>
        <TextInput
          onChangeText={text => setEmail(text)}
          placeholder="ex. example@example.com"
        />
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
