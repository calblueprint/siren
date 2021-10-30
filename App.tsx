/* eslint-disable react/style-prop-object */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import RootNavigator from './navigation/RootNavigator';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <RootNavigator />
    </View>
  );
}
