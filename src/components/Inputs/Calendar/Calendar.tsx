import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { QuestionComponentProps } from 'types/types';
import { TextRegularBold } from 'assets/fonts/Fonts';
import {
  TextContainer,
  TextDescription,
  TextExample,
} from 'components/Inputs/styles';
import { Colors } from 'assets/Colors';

const styles = StyleSheet.create({
  calendar: {
    borderWidth: 1,
    borderColor: Colors.textBlack,
    borderRadius: 8,
  },
  example: {
    height: 30,
    fontSize: 12,
    lineHeight: 7,
    color: Colors.brandGray,
    borderWidth: 1,
    borderColor: Colors.textBlack,
    borderRadius: 8,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
});

export default function Calendar(props: QuestionComponentProps) {
  const { question, setAnswer, existingAnswer } = props;
  const [date, setDate] = useState(existingAnswer || new Date(1598051730000));
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

  const getExampleText = () => {
    return isSet ? date.toLocaleDateString('en-us') : ` ${question.example} `;
  };

  const getDescription = () => {
    return question.description.length > 0 ? (
      <TextDescription>{question.description}</TextDescription>
    ) : null;
  };

  return (
    <TextContainer style={{ marginBottom: 24 }}>
      <TextContainer>
        <TextRegularBold>{question.displayText}</TextRegularBold>
        {getDescription()}
      </TextContainer>
      <Pressable style={styles.example} onPress={showDatepicker}>
        <TextExample>{getExampleText()}</TextExample>
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
    </TextContainer>
  );
}
