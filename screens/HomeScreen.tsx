import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextRegular, TextBold, TextBoldItalic } from '../assets/fonts/Fonts';

export const screenStyles = StyleSheet.create({
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// TO DO: test if fonts work
const HomeScreen = () => {
  return (
    <View style={screenStyles.text}>
      <TextBoldItalic>Welcome to the homepage!</TextBoldItalic>
    </View>
  );
};

export default HomeScreen;
