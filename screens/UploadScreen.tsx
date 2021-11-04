import React from 'react';
import { Text, View } from 'react-native';
import { screenStyles } from './HomeScreen';
import { TextRegular } from '../assets/fonts/Fonts';

const UploadScreen = () => {
  return (
    <View style={screenStyles.text}>
      <TextRegular>Upload your necessary documents!</TextRegular>
    </View>
  );
};

export default UploadScreen;
