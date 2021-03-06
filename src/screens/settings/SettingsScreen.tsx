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

  // update client info - TO DO: error handling
  const update = async (
    currPassword: string,
    newLang: string,
    newEmail: string,
    newPassword: string,
  ) => {
    try {
      const client: Client = state;
      if (newEmail !== '') {
        updateEmail(newEmail, client.id);
      }
      if (newLang !== '') {
        updateFirebaseLanguage(newLang, client.id);
      }
      if (newPassword !== '' && currPassword !== '') {
        updatePassword(currPassword, newPassword);
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
