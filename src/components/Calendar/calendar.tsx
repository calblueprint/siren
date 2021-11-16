import React, { useState } from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { QuestionComponentProps } from 'types/types';

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
  example: {
    width: '74%',
    height: 30,
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
    paddingLeft: 10,
    fontSize: 12,
    color: '#6A6A6A',
  },
  description: {
    width: '74%',
    fontSize: 12,
    lineHeight: 17,
    color: '#6A6A6A',
    marginBottom: 8,
  },
});

export default function Calendar(props: QuestionComponentProps) {
  const [date, setDate] = useState(new Date(1598051730000));
  const { question, setAnswer } = props;
  const [show, setShow] = useState(false);
  const [isSet, setisSet] = useState(false);

  const onChange = (event: Event, selectedDate?: Date) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setAnswer(question, currentDate);
    setisSet(true);
  };
  const showDatepicker = (): void => {
    setShow(true);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.displayText}>{question.displayText}</Text>
      {question.description.length > 0 ? (
        <Text style={styles.description}>{question.description}</Text>
      ) : null}
      <Pressable style={styles.example} onPress={showDatepicker}>
        {isSet ? (
          <Text style={styles.exampleText}>
            {date.toLocaleDateString('en-us')}
          </Text>
        ) : (
          <Text style={styles.exampleText}> {question.example} </Text>
        )}
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
