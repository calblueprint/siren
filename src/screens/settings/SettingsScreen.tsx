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
import { ContentContainer, ButtonView, ButtonHeader } from './styles';
// eslint-disable-next-line no-restricted-imports
import firebase from '../../database/clientApp';

const SettingsScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const db = firebase.firestore();
  const clientCollection = db.collection('clients');

  const updateLanguage = async (lang: string) => {
    try {
      const user = firebase.auth().currentUser;
      const userDoc = clientCollection.doc(user?.uid);
      const newFields = { language: lang };
      await userDoc.update(newFields);
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
        user?.email,
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
      <TextSubtitle>Go Back</TextSubtitle>
    </ButtonHeader>
  );

  return (
    <PageContainer>
      {getBackHeader()}
      <ContentContainer>
        <TextRegular>Change Email</TextRegular>
        <TextInput
          onChangeText={text => setEmail(text)}
          placeholder="ex. example@example.com"
        />
        <TextRegular>Change Password</TextRegular>
        <TextInput
          onChangeText={text => setPassword(text)}
          placeholder="ex. password123"
          secureTextEntry
        />
        <TextRegular>
          Current Password{' \n'}
          <TextRegularRed>Required if Changing Password</TextRegularRed>
        </TextRegular>
        <TextInput
          onChangeText={text => setCurrentPassword(text)}
          placeholder="ex. password123"
          secureTextEntry
        />
        <TextRegular>Change your language preference</TextRegular>
        <TextInput
          onChangeText={text => setLanguage(text)}
          placeholder="ex. english"
        />
      </ContentContainer>

      <ButtonView>
        <ButtonDark
          onPress={() => update(currentPassword, language, email, password)}
        >
          <TextRegularWhite>Update</TextRegularWhite>
        </ButtonDark>
      </ButtonView>
    </PageContainer>
  );
};

export default SettingsScreen;
