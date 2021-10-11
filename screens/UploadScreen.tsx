import React from 'react';
import { Text, View } from 'react-native';
import { screenStyles } from './HomeScreen'; 

export function UploadScreen() {
    return (
      <View style={screenStyles.text}>
        <Text>Upload your necessary documents!</Text>
      </View>
    );
  }