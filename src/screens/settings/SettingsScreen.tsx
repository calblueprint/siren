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
