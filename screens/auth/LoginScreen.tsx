/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import firebase from '../../firebase/clientApp';

const auth = firebase.auth();

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

type LoginData = {
  email: string;
  password: string;
};

const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit } = useForm();

  const onLogin = async (data: LoginData) => {
    // TODO: error handling
    await auth.signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.title}>
          <Text>Log into SIREN</Text>
        </View>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Text>
                Email <Text style={styles.red}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </>
          )}
          name="email"
          defaultValue=""
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Text>
                Password <Text style={styles.red}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </>
          )}
          name="password"
          defaultValue=""
        />
      </View>
      <View style={styles.button}>
        <Button title="Log in" onPress={handleSubmit(onLogin)} />
      </View>
    </View>
  );
};

export default LoginScreen;
