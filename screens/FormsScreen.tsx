import React from 'react';
import { Text, View } from 'react-native';

import { screenStyles } from './HomeScreen';

const FormsScreen = () => {
  return (
    <View style={screenStyles.text}>
      <Text>Fill out your intake form!</Text>
    </View>
  );
};

export default FormsScreen;
