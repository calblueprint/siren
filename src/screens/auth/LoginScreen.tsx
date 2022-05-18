/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';
import { ButtonDark, TextInput } from 'assets/Components';
import {
  TextBold,
  TextRegular,
  TextRegularWhite,
  TextRegularRed,
  TextSubtitle,
} from 'assets/fonts/Fonts';
import { login } from 'database/auth';
import { Text } from 'context/ContextProvider';
// eslint-disable-next-line no-restricted-imports
import { PageContainer } from '../styles';
import {
  ContentContainer,
  TitleContainer,
  ButtonView,
  ButtonHeader,
} from './styles';

const LoginScreen = ({ route, navigation }: any) => {
  // const { language } = route.params;
  const { langState, langUpdate } = useContext(LanguageContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getBackHeader = () => (
    <ButtonHeader onPress={() => navigation.navigate('Welcome')}>
      <Appbar.BackAction
        size={18}
        style={{ margin: 0 }}
        onPress={() => navigation.navigate('Welcome')}
      />
      <TextSubtitle>{Text('Go Back')}</TextSubtitle>
    </ButtonHeader>
  );

  return (
    <PageContainer>
      {getBackHeader()}
      <ContentContainer>
        <TitleContainer>
          <TextBold>{Text('Log into SIREN')}</TextBold>
        </TitleContainer>
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
        <TextInput onChangeText={text => setPassword(text)} secureTextEntry />
      </ContentContainer>
      <ButtonView>
        <ButtonDark onPress={() => login(email, password)}>
          <TextRegularWhite>{Text('Log in')}</TextRegularWhite>
        </ButtonDark>
      </ButtonView>
    </PageContainer>
  );
};

export default LoginScreen;
