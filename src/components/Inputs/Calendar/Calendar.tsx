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
import { LanguageContext } from 'context/ContextProvider';

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
  const { userLanguage } = React.useContext(LanguageContext);

  const onChange = (event: Event, selectedDate?: Date) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setAnswer(question, currentDate.toLocaleDateString('en-us'));
    setisSet(true);
  };

  const showDatepicker = (): void => {
    setShow(true);
  };

  const getExampleText = () => {
    return isSet
      ? date.toLocaleDateString('en-us')
      : ` ${question.example.get(userLanguage)} `;
  };

  const getDescription = () => {
    if (question?.description?.get(userLanguage)?.length) {
      return (
        <TextDescription>
          {question.description.get(userLanguage)}
        </TextDescription>
      );
    }
    return null;
  };

  return (
    <TextContainer style={{ marginBottom: 24 }}>
      <TextContainer>
        <TextRegularBold>
          {question.displayText.get(userLanguage)}
        </TextRegularBold>
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
