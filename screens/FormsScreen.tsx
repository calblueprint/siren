import React from 'react';
import { Text, View } from 'react-native';
import { TextRegular } from '../assets/fonts/Fonts';
import { screenStyles } from './HomeScreen';

const FormsScreen = () => {
  return (
    <View style={screenStyles.text}>
      <TextRegular>Fill out your intake form!</TextRegular>
    </View>
  );
};

export default FormsScreen;
