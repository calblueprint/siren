import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import firebase from '../../firebase/clientApp';

const auth = firebase.auth();

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  form: {
    paddingHorizontal: '12%',
    width: '100%',
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
  },
  button: {
    position: 'absolute',
    bottom: '15%',
  },
});

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(email, password);
      } else {
        console.log('Please input email and password');
      }
    } catch (error) {
      console.log(error);
      // setLoginError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>Log into SIREN</Text>
      </View>
      <View style={styles.form}>
        <Text>
          Email <Text style={styles.red}>*</Text>
        </Text>
        <TextInput
          value={email}
          onChangeText={(text: React.SetStateAction<string>) => setEmail(text)}
          style={styles.input}
        />
        <Text>
          Password <Text style={styles.red}>*</Text>
        </Text>
        <TextInput
          value={password}
          onChangeText={(text: React.SetStateAction<string>) =>
            setPassword(text)
          }
          style={styles.input}
        />
      </View>
      <View style={styles.button}>
        <Button title="Login" onPress={onLogin} />
      </View>
    </View>
  );
};

export default LoginScreen;
