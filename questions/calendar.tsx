import React, { useState } from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { QuestionComponentProps } from '../types/types';

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
    height: 216,
    borderWidth: 1,
    borderColor: '#2B2B2B',
    borderRadius: 8,
  },
  example: {
    width: '74%',
    height: 40,
    fontSize: 12,
    lineHeight: 7,
    color: '#6A6A6A',
    borderWidth: 1,
    borderColor: '#2B2B2B',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  exampleText: {
    fontSize: 12,
  },
});

export default function Calendar(props: QuestionComponentProps) {
  const [date, setDate] = useState(new Date(1598051730000));
  const { question, setAnswer } = props;
  const [show, setShow] = useState(false);

  const onChange = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setAnswer(question, currentDate);
    setShow(false);
  };
  const showDatepicker = (): void => {
    setShow(true);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.displayText}>{question.displayText}</Text>
      <Pressable style={styles.example} onPress={showDatepicker}>
        <Text style={styles.exampleText}> {question.example} </Text>
      </Pressable>
      {show ? (
        <DateTimePicker
          style={styles.calendar}
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour
          display="default"
          onChange={onChange}
        />
      ) : null}
    </View>
  );
}
