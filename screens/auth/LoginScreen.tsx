/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { login } from '../../firebase/auth';

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
  title: {
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    width: '80%',
  },
});

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.title}>
          <Text>Log into SIREN</Text>
        </View>
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
      </View>
      <View style={styles.button}>
        <Button title="Log in" onPress={() => login(email, password)} />
      </View>
    </View>
  );
};

export default LoginScreen;
