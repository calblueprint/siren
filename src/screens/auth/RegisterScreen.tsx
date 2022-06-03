/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';
import {
  TextRegular,
  TextRegularWhite,
  TextRegularRed,
  TextSubtitle,
  TextBold,
} from 'assets/fonts/Fonts';
import { ButtonDark, TextInput } from 'assets/Components';
import { register } from 'database/auth';
import { Text } from 'context/ContextProvider';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// eslint-disable-next-line no-restricted-imports
import { PageContainer } from '../styles';
import { TitleContainer, ButtonView, ButtonHeader } from './styles';

const RegisterScreen = ({ route, navigation }: any) => {
  const { langStr } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [fullName, setFullName] = useState('');

  const onRegister = (e: string, p: string, n: string) => {
    if (email === '' || password === '' || fullName === '') {
      console.log('please fill in all inputs');
    } else if (password !== passwordRepeat) {
      console.log('passwords do not match');
    } else {
      register(e, p, n, langStr);
    }
  };

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
          <TextBold>{Text('Register')}</TextBold>
        </TitleContainer>
        <TextRegular>
          {Text('Name')} <TextRegularRed>*</TextRegularRed>
        </TextRegular>
        <TextInput
          onChangeText={text => {
            setFullName(text);
          }}
          // BUG: using placeholder with Text wrapper will result in JSON serialize errors
          // TO DO/WORKAROUND: use TextRegular (or any other regular text components) and set as description before a TextInput
          // placeholder={Text('ex. Noah Alexander Hernandez')}
        />
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
        <TextRegular>
          {Text('Re-enter Password')} <TextRegularRed>*</TextRegularRed>
        </TextRegular>
        <TextInput
          onChangeText={text => setPasswordRepeat(text)}
          secureTextEntry
        />
      </KeyboardAwareScrollView>

      <ButtonView>
        <ButtonDark onPress={() => onRegister(email, password, fullName)}>
          <TextRegularWhite>{Text('Get started!')}</TextRegularWhite>
        </ButtonDark>
      </ButtonView>
    </PageContainer>
  );
};

export default RegisterScreen;
