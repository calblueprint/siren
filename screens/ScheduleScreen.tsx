import React from 'react';
import { Text, View } from 'react-native';
import { screenStyles } from './HomeScreen';

export function ScheduleScreen() {
    return (
      <View style={screenStyles.text}>
        <Text>Schedule an appointment with your attorney!</Text>
      </View>
    );
  }