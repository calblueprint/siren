import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import firebase from '../../firebase/clientApp';

const auth = firebase.auth();

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
      <Text>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text: React.SetStateAction<string>) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text: React.SetStateAction<string>) => setPassword(text)}
      />
      <Button title="Login" onPress={onLogin} />
    </View>
  );
};

export default LoginScreen;
