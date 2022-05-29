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
import LanguageRadio from 'components/LanguageRadio/LanguageRadio';
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
      let updated = '';
      let err = '';
      // handle email
      if (newEmail !== '') {
        if (checkEmail(newEmail)) {
          const updatedTemp = updated.concat(`\n${e}`);
          updated = updatedTemp;
          await updateEmail(newEmail);
          setEmail('');
        } else {
          const errTemp = err.concat(`\n${e}`);
          err = errTemp;
        }
      }
      // handle language
      if (newLang !== '') {
        if (await updateFirebaseLanguage(newLang)) {
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

  return (
    <PageContainer>
      {getBackHeader()}
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

      <ButtonView>
        <ButtonDark
          onPress={() => update(currentPassword, language, email, password)}
        >
          <TextRegularWhite>{Text('Update')}</TextRegularWhite>
        </ButtonDark>
      </ButtonView>
    </PageContainer>
  );
};

export default SettingsScreen;
