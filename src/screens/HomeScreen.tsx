import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const screenStyles = StyleSheet.create({
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const HomeScreen = () => {
  return (
    <View style={screenStyles.text}>
      <Text>Welcome to the homepage!</Text>
    </View>
  );
};

export default HomeScreen;
