/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

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
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: '45%',
  },
});

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.title}>
          <Text>Welcome to SIREN!</Text>
        </View>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac nunc
          sed tortor mollis pellentesque. Nam nisi sapien, tristique nec erat
          sed, suscipit vehicula augue.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Log in" onPress={() => navigation.navigate('Login')} />
        </View>
        <View style={styles.button}>
          <Button
            title="Register"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;
