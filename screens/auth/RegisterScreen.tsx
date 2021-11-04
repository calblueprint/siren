/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { register } from '../../firebase/auth';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    paddingHorizontal: '12%',
  },
  content: {
    height: '80%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    marginVertical: 10,
    border: '1px solid black',
    borderRadius: 5,
    padding: 5,
  },
  red: {
    color: 'red',
  },
  button: {
    width: '80%',
  },
});

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [fullName, setFullName] = useState('');
  const [language, setLanguage] = useState('');

  const onRegister = (e: string, p: string, n: string) => {
    if (email === '' || password === '' || fullName === '' || language === '') {
      console.log('please fill in all inputs');
    } else if (password !== passwordRepeat) {
      console.log('passwords do not match');
    } else {
      register(e, p, n);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>
          Name <Text style={styles.red}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setFullName(text)}
        />
        <Text>
          Email <Text style={styles.red}>*</Text>
        </Text>
        <TextInput style={styles.input} onChangeText={text => setEmail(text)} />
        <Text>
          Password <Text style={styles.red}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <Text>
          Re-enter Password <Text style={styles.red}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setPasswordRepeat(text)}
          secureTextEntry
        />
        <Text>
          Language preference <Text style={styles.red}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setLanguage(text)}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Get started!"
          onPress={() => onRegister(email, password, fullName)}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
