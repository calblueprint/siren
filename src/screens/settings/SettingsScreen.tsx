/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import {
  TextRegular,
  TextRegularWhite,
  TextRegularRed,
  TextSubtitle,
} from 'assets/fonts/Fonts';
import { ButtonDark, TextInput } from 'assets/Components';
import { logout } from 'database/auth';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
// eslint-disable-next-line no-restricted-imports
import { PageContainer } from '../styles';
import {
  RadioContainer,
  ButtonContainer,
  ContentContainer,
  ButtonView,
  ButtonHeader,
} from './styles';
// eslint-disable-next-line no-restricted-imports
import firebase from '../../database/clientApp';
// eslint-disable-next-line no-restricted-imports
import { LanguageContext, Text } from '../../context/ContextProvider';

const languageOptions = ['English', 'Español', 'Tiếng Việt'];

function Radio({ handleRadioFunc, setLanguage }: any) {
  const [value, setValue] = useState('');
  const onChange = (val: string): void => {
    setLanguage(val);
    setValue(val);
    handleRadioFunc(val);
  };

  return (
    <RadioContainer>
      {languageOptions.map((option, key) => (
        // eslint-disable-next-line react/no-array-index-key
        <ButtonContainer key={key}>
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
}

const SettingsScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const db = firebase.firestore();
  const clientCollection = db.collection('clients');
  const { userLanguageChange } = React.useContext(LanguageContext);

  const updateLanguage = async (lang: string) => {
    try {
      const lowercaseLang = lang.toLowerCase();
      console.log('Updated Language!');
      const user = firebase.auth().currentUser;
      const userDoc = clientCollection.doc(user?.uid);
      const newFields = { language: lowercaseLang };
      await userDoc.update(newFields);
      if (lowercaseLang === 'Español') {
        userLanguageChange('ES');
      }
      if (lowercaseLang === 'Tiếng Việt') {
        userLanguageChange('VIET');
      }
      if (lowercaseLang === 'English') {
        userLanguageChange('EN');
      }
    } catch (err) {
      console.log('Error in updating language preference');
    }
  };

  const updateEmail = async (newEmail: string) => {
    try {
      const user = firebase.auth().currentUser;
      const userDoc = clientCollection.doc(user?.uid);
      const newFields = { email: newEmail };
      await userDoc.update(newFields);
      await user?.updateEmail(newEmail);
    } catch (err) {
      console.log('Error in updating email');
    }
  };

  const reauthenticate = async (currPassword: string) => {
    try {
      const user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        user?.email as string,
        currPassword,
      );
      await user?.reauthenticateWithCredential(credential);
    } catch (err) {
      console.log('Error in reauthenticating');
    }
  };

  const updatePassword = async (currPassword: string, newPassword: string) => {
    try {
      const user = firebase.auth().currentUser;
      reauthenticate(currPassword);
      await user?.updatePassword(newPassword);
    } catch (err) {
      console.log('Error in updating password');
      console.log(err);
    }
  };

  const update = async (
    currPassword: string,
    newLang: string,
    newEmail: string,
    newPassword: string,
  ) => {
    try {
      if (newEmail !== '') {
        updateEmail(newEmail);
      }
      if (newLang !== '') {
        updateLanguage(newLang);
      }
      if (newPassword !== '' && currPassword !== '') {
        updatePassword(currPassword, newPassword);
      }
    } catch (err) {
      console.log('Error in updating info');
    }
  };

  const getBackHeader = () => (
    <ButtonHeader onPress={() => navigation.navigate('Home')}>
      <Appbar.BackAction
        size={18}
        style={{ margin: 0 }}
        onPress={() => navigation.navigate('Home')}
      />
      <TextSubtitle>{Text('Go Back')}</TextSubtitle>
    </ButtonHeader>
  );

  const handleRadio = (val: string): void => {
    if (val === 'Español') {
      userLanguageChange('ES');
    }
    if (val === 'Tiếng Việt') {
      userLanguageChange('VIET');
    }
    if (val === 'English') {
      userLanguageChange('EN');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      display: 'flex',
      width: '100%',
    },
  });

  return (
    <PageContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {getBackHeader()}
        <ContentContainer>
          <TextRegular>{Text('welcome')}</TextRegular>
          <TextRegular>{Text('Change Email')}</TextRegular>
          <TextInput
            onChangeText={text => setEmail(text)}
            placeholder={Text('ex. example@example.com')}
          />
          <TextRegular>Change Password</TextRegular>
          <TextInput
            onChangeText={text => setPassword(text)}
            placeholder={Text('ex. password123')}
            secureTextEntry
          />
          <TextRegular>
            {Text('Current Password')}
            {' \n'}
            <TextRegularRed>
              {Text('Required if Changing Password')}
            </TextRegularRed>
          </TextRegular>
          <TextInput
            onChangeText={text => setCurrentPassword(text)}
            placeholder={Text('ex. password123')}
            secureTextEntry
          />
          <TextRegular>{Text('Change your language preference')}</TextRegular>
          <Radio handleRadioFunc={handleRadio} setLanguage={setLanguage} />
          <ButtonView>
            <ButtonDark
              onPress={() => update(currentPassword, language, email, password)}
            >
              <TextRegularWhite>{Text('Update')}</TextRegularWhite>
            </ButtonDark>
          </ButtonView>
        </ContentContainer>
      </KeyboardAvoidingView>

      <ButtonView>
        <ButtonDark onPress={logout}>
          <TextRegularWhite>{Text('Logout')}</TextRegularWhite>
        </ButtonDark>
      </ButtonView>
    </PageContainer>
  );
};

export default SettingsScreen;
