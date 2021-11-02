import React from 'react';
import { Text, View } from 'react-native';
import styles from '../ScreenStyles';

const HomeScreen = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Welcome to the homepage!</Text>
    </View>
  );
};

export default HomeScreen;
