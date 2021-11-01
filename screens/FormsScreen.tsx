import React from 'react';
import { Text, View } from 'react-native';
import GeneralQuestionManager from './GeneralQuestionManager';
import { screenStyles } from './HomeScreen';

const FormsScreen = () => {
  return (
    <View style={screenStyles.text}>
      <GeneralQuestionManager />
      <Text>Fill out your intake form!</Text>
    </View>
  );
};

export default FormsScreen;
