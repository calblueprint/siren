import React from 'react';
import { Text, View } from 'react-native';
import { screenStyles } from './HomeScreen';

const ScheduleScreen = () => {
  return (
    <View style={screenStyles.text}>
      <Text>Schedule an appointment with your attorney!</Text>
    </View>
  );
};

export default ScheduleScreen;
