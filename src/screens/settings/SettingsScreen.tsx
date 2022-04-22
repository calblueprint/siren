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
import { RadioButton } from 'react-native-paper';
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

function Radio({ handleRadioFunc }: any) {
  const [value, setValue] = useState('English');

  const onChange = (val: string): void => {
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
      const user = firebase.auth().currentUser;
      const userDoc = clientCollection.doc(user?.uid);
      const newFields = { language: lowercaseLang };
      await userDoc.update(newFields);
      if (lowercaseLang === 'Español') {
        userLanguageChange('es');
      }
      if (lowercaseLang === 'Tiếng Việt') {
        userLanguageChange('vie');
      }
      if (lowercaseLang === 'English') {
        userLanguageChange('en');
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
      <TextSubtitle>{Text('Go Back')}</TextSubtitle>
    </ButtonHeader>
  );

  const handleRadio = (val: string): void => {
    setLanguage(val);
  };

  return (
    <PageContainer>
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
        <TextInput
          onChangeText={text => setLanguage(text)}
          placeholder={Text('ex. english')}
        />
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
