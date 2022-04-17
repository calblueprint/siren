/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';
import {
  TextBold,
  TextRegular,
  TextRegularWhite,
  TextRegularRed,
  TextSubtitle,
} from 'assets/fonts/Fonts';
import { ButtonDark, TextInput } from 'assets/Components';
import { PageContainer } from 'screens/styles';
import { login } from 'database/auth';
import {
  ContentContainer,
  TitleContainer,
  ButtonView,
  ButtonHeader,
} from './styles';

const LoginScreen = ({ route, navigation }: any) => {
  const { language } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      <TextSubtitle>Go Back</TextSubtitle>
    </ButtonHeader>
  );

  return (
    <PageContainer>
      {getBackHeader()}
      <ContentContainer>
        <TitleContainer>
          <TextBold>Log into SIREN</TextBold>
        </TitleContainer>
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
