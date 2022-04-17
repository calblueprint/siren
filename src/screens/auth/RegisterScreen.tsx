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
import { PageContainer } from 'screens/styles';
import { register } from 'database/auth';
import { ContentContainer, ButtonView, ButtonHeader } from './styles';

const RegisterScreen = ({ route, navigation }: any) => {
  const { language } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [fullName, setFullName] = useState('');

  const onRegister = (e: string, p: string, n: string, lang: string) => {
    if (email === '' || password === '' || fullName === '' || lang === '') {
      console.log('please fill in all inputs');
    } else if (password !== passwordRepeat) {
      console.log('passwords do not match');
    } else {
      register(e, p, n, lang);
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
      </ContentContainer>
      <ButtonView>
        <ButtonDark
          onPress={() => onRegister(email, password, fullName, language)}
        >
          <TextRegularWhite>Get started!</TextRegularWhite>
        </ButtonDark>
      </ButtonView>
    </PageContainer>
  );
};

export default RegisterScreen;
