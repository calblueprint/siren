/* eslint-disable no-restricted-imports */
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
import { logout } from 'database/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet } from 'react-native';
// eslint-disable-next-line no-restricted-imports
import LanguageRadio from 'components/LanguageRadio/LanguageRadio';
import { dictionaryList } from 'multilingual';
import { LanguageContext, Text } from 'context/ContextProvider';
import {
  updateEmail,
  updateFirebaseLanguage,
  updatePassword,
} from 'database/auth';
import { PageContainer } from '../styles';
import { ContentContainer, ButtonView, ButtonHeader } from './styles';

const SettingsScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState(''); // string type in Firebase
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
  const { langUpdate } = React.useContext(LanguageContext); // dicitionary

  // update client info - TO DO: error handling
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
        updateFirebaseLanguage(newLang);
      }
      if (newPassword !== '' && currPassword !== '') {
        updatePassword(currPassword, newPassword);
      }
    } catch (err) {
      console.log('Error in updating info');
    }
  };

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
    view: {
      height: '100%',
      marginTop: '8%',
    },
  });

  return (
    <PageContainer>
      <ButtonHeader onPress={() => navigation.navigate('Home')}>
        <Appbar.BackAction
          size={18}
          style={{ margin: 0 }}
          onPress={() => navigation.navigate('Home')}
        />
        <TextSubtitle>{Text('Go Back')}</TextSubtitle>
      </ButtonHeader>
      <KeyboardAwareScrollView style={styles.container}>
        <ContentContainer>
          <TextRegular>{Text('welcome')}</TextRegular>
          <TextRegular>{Text('Change Email')}</TextRegular>
          <TextInput
            onChangeText={text => setEmail(text)}
            // placeholder={Text('ex. example@example.com')} // CAUSING ERRORS
          />
          <TextRegular>Change Password</TextRegular>
          <TextInput
            onChangeText={text => setPassword(text)}
            // placeholder={Text('ex. password123')}
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
            // placeholder={Text('ex. password123')}
            secureTextEntry
          />
          <TextRegular>{Text('Change your language preference')}</TextRegular>
          <LanguageRadio dictUpdate={langUpdate} stringUpdate={setLanguage} />
        </ContentContainer>
      </KeyboardAwareScrollView>

      <ButtonView>
        <ButtonDark onPress={logout}>
          <TextRegularWhite>{Text('Logout')}</TextRegularWhite>
        </ButtonDark>
      </ButtonView>
    </PageContainer>
  );
};

export default SettingsScreen;
