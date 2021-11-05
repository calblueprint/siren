import React from 'react';
import { View, StyleSheet } from 'react-native';
import GeneralQuestionManager from './GeneralQuestionManager';

export const screenStyles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'stretch',
  },
});

const FormsScreen = () => {
  return (
    <View style={screenStyles.container}>
      <GeneralQuestionManager />
    </View>
  );
};

export default FormsScreen;
