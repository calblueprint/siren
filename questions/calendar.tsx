import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Question } from '../types/types';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 24,
  },
  displayText: {
    width: '74%',
    height: 17,
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '600',
    color: '#2B2B2B',
    marginBottom: 8,
  },
  calendar: {
    width: '74%',
    borderWidth: 1,
    borderColor: '#2B2B2B',
    borderRadius: 8,
  },
});

export default function Calendar(question: Question) {
  const [date] = useState(new Date(1598051730000));
  const { displayText } = question;
  return (
    <View style={styles.container}>
      <Text style={styles.displayText}>{displayText}</Text>
      <DateTimePicker
        style={styles.calendar}
        testID="dateTimePicker"
        value={date}
        mode="date"
        is24Hour
        display="default"
      />
    </View>
  );
}
