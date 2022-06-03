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
import { alertTextStr, checkEmail } from 'database/helpers';
import { TextStr } from 'context/ContextProvider';
import { ButtonDark, TextInput } from 'assets/Components';
import { logout } from 'database/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet } from 'react-native';
// eslint-disable-next-line no-restricted-imports
import LanguageRadio from 'components/LanguageRadio/LanguageRadio';
import { ClientContext, LanguageContext, Text } from 'context/ContextProvider';
import {
  updateEmail,
  updateFirebaseLanguage,
  updatePassword,
} from 'database/auth';
import { Client } from 'types/types';
import { PageContainer } from '../styles';
import {
  ButtonView,
  ButtonHeader,
  ButtonContainer,
  ButtonsContainer,
} from './styles';

const SettingsScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState(''); // string type in Firebase
  const [currentPassword, setCurrentPassword] = useState('');
  const { state } = React.useContext(ClientContext);
  const { langUpdate } = React.useContext(LanguageContext); // dicitionary
  const e = TextStr('Email', language);
  const p = TextStr('Password', language);
  const l = TextStr('Language', language);

  // update client info - TO DO: error handling
  const update = async (
    currPassword: string,
    newLang: string,
    newEmail: string,
    newPassword: string,
  ) => {
    try {
      const client: Client = state;
      let updated = '';
      let err = '';
      // handle email
      if (newEmail !== '') {
        if (checkEmail(newEmail)) {
          const updatedTemp = updated.concat(`\n${e}`);
          updated = updatedTemp;
          await updateEmail(newEmail, client.id);
          setEmail('');
        } else {
          const errTemp = err.concat(`\n${e}`);
          err = errTemp;
        }
      }
      // handle language
      if (newLang !== '') {
        if (await updateFirebaseLanguage(newLang, client.id)) {
          const updatedTemp = updated.concat(`\n${l}`);
          updated = updatedTemp;
          setLanguage('');
        } else {
          const errTemp = err.concat(`\n${l}`);
          err = errTemp;
        }
      }
      // handle password
      if (newPassword !== '' && currPassword !== '') {
        if (await updatePassword(currPassword, newPassword)) {
          const updatedTemp = updated.concat(`\n${p}`);
          updated = updatedTemp;
          setPassword('');
        } else {
          const errTemp = err.concat(`\n${p}`);
          err = errTemp;
        }
      }
      // handle alerts
      let updatedFinal = '';
      if (updated !== '') {
        updatedFinal = TextStr('Updated: ', language)
          .concat(updated)
          .concat('\n');
      }
      let errFinal = '';
      if (err !== '') {
        errFinal = TextStr('Could not update: ', language).concat(err);
      }
      if (updated !== '' || err !== '') {
        // alert if there are updates made
        alertTextStr(updatedFinal.concat(`\n${errFinal}`), newLang);
      }
      navigation.navigate('Home');
    } catch (err) {
      console.log('Error in updating info');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      display: 'flex',
      width: '100%',
      marginTop: '10%',
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
      </KeyboardAwareScrollView>

      <ButtonsContainer>
        <ButtonContainer>
          <ButtonView>
            <ButtonDark
              onPress={() => update(currentPassword, language, email, password)}
            >
              <TextRegularWhite>{Text('Update')}</TextRegularWhite>
            </ButtonDark>
          </ButtonView>
        </ButtonContainer>
        <ButtonContainer>
          <ButtonView>
            <ButtonDark onPress={logout}>
              <TextRegularWhite>{Text('Logout')}</TextRegularWhite>
            </ButtonDark>
          </ButtonView>
        </ButtonContainer>
      </ButtonsContainer>
    </PageContainer>
  );
};

export default SettingsScreen;
