/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import firebase from '../../firebase/clientApp';
import { Client } from '../../types/types';
import { setClient } from '../../firebase/queries';

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
  button: {
    width: '80%',
  },
});

type RegisterData = {
  name: string;
  email: string;
  password: string;
  language: string; // TODO: edit
};

const RegisterScreen = ({ navigation }) => {
  const { control, handleSubmit } = useForm();

  const onRegister = async (data: RegisterData) => {
    // TODO: error handling
    await auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(async res => {
        res.user.updateProfile({ displayName: data.name });
        if (res.user != null) {
          const client: Client = {
            id: res.user.uid,
            fullName: data.name,
            createdAt: Date.now(),
          };
          await setClient(client);
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Text>
                Name <Text style={styles.red}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </>
          )}
          name="name"
          defaultValue=""
        />
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
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Text>
                Re-enter password <Text style={styles.red}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </>
          )}
          name="re-password"
          defaultValue=""
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Text>
                Language preference <Text style={styles.red}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </>
          )}
          name="language"
          defaultValue=""
        />
      </View>
      <View style={styles.button}>
        <Button title="Get started!" onPress={handleSubmit(onRegister)} />
      </View>
    </View>
  );
};

export default RegisterScreen;
