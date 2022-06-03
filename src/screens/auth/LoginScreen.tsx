/* eslint-disable no-restricted-imports */
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
import { StyleSheet } from 'react-native';
// eslint-disable-next-line no-restricted-imports
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PageContainer } from '../styles';
import { TitleContainer, ButtonView, ButtonHeader } from './styles';

const LoginScreen = ({ route, navigation }: any) => {
  const { langStr } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getBackHeader = () => (
    <ButtonHeader onPress={() => navigation.navigate('Welcome', { langStr })}>
      <Appbar.BackAction
        size={18}
        style={{ margin: 0 }}
        onPress={() => navigation.navigate('Welcome', { langStr })}
      />
      <TextSubtitle>{Text('Go Back')}</TextSubtitle>
    </ButtonHeader>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      display: 'flex',
      width: '100%',
      marginTop: '40%',
    },
  });

  return (
    <PageContainer>
      {getBackHeader()}
      <KeyboardAwareScrollView style={styles.container}>
        <TitleContainer>
          <TextBold>{Text('Log into SIREN')}</TextBold>
        </TitleContainer>
        <TextRegular>
          {Text('Email')} <TextRegularRed>*</TextRegularRed>
        </TextRegular>
        <TextInput
          onChangeText={text => setEmail(text)}
          // placeholder={Text('ex. example@example.com')}
        />
        <TextRegular>
          {Text('Password')} <TextRegularRed>*</TextRegularRed>
        </TextRegular>
        <TextInput onChangeText={text => setPassword(text)} secureTextEntry />
      </KeyboardAwareScrollView>
      <ButtonView>
        <ButtonDark onPress={() => login(email, password, langStr)}>
          <TextRegularWhite>{Text('Log in')}</TextRegularWhite>
        </ButtonDark>
      </ButtonView>
    </PageContainer>
  );
};

export default LoginScreen;
