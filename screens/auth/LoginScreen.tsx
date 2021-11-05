/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {
  ContentContainer,
  TitleContainer,
  ButtonView,
  TextInput,
} from './styles';
import {
  TextBold,
  TextRegular,
  TextRegularWhite,
  TextRegularRed,
} from '../../assets/fonts/Fonts';
import { ButtonDark } from '../../assets/buttons/Buttons';
import { PageContainer } from '../styles';
import { login } from '../../firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <PageContainer>
      <ContentContainer>
        <TitleContainer>
          <TextBold>Log into SIREN</TextBold>
        </TitleContainer>
        <TextRegular>
          Email <TextRegularRed>*</TextRegularRed>
        </TextRegular>
        <TextInput onChangeText={text => setEmail(text)} />
        <TextRegular>
          Password <TextRegularRed>*</TextRegularRed>
        </TextRegular>
        <TextInput onChangeText={text => setPassword(text)} secureTextEntry />
      </ContentContainer>
      <ButtonView>
        <ButtonDark onPress={() => login(email, password)}>
          <TextRegularWhite>Log in</TextRegularWhite>
        </ButtonDark>
      </ButtonView>
    </PageContainer>
  );
};

export default LoginScreen;
