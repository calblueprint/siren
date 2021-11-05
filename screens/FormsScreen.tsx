import React from 'react';
import { View, StyleSheet } from 'react-native';
import SmallInput from '../questions/smallInput';
import LargeInput from '../questions/largeInput';
import renderDropdown from '../questions/dropdown';
import renderCalendar from '../questions/calendar';

export const styles = StyleSheet.create({
  questions: {
    top: '16%',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
});

export const questionData = {
  '0': {
    active: true,
    answerType: 'largeInput',
    description: 'If your family has not been impacted by COVID-19, please skip.',
    displayText: 'If your family has been impacted by COVID-19, please describe below.',
    key: 'COVID',
    order: 0,
    questionType: 'intake'
  },
  '1': {
    active: true,
    answerType: 'smallInput',
    description: 'If you do not have an email, put N/A.',
    displayText: 'Email Address',
    example: 'ex.example@example.com',
    key: 'Email',
    order: 1,
    questionType: 'intake'
  }
}

const smallInput = Object.keys(questionData).filter(
  (id) => questionData[id].answerType == 'smallInput'
)

const largeInput = Object.keys(questionData).filter(
  (id) => questionData[id].answerType == 'largeInput'
)

const FormsScreen = () => {


  const dropdown = renderDropdown();
  const calendar = renderCalendar()

  return (
    <View style={styles.questions}>
      {Object.keys(smallInput).map((key: any) => (
        <SmallInput
          displayText={questionData[key].displayText}
          description={questionData[key].description}
          example={questionData[key].example}
        />
      ))}
      {Object.keys(largeInput).map((key: any) => (
        <LargeInput
          displayText={questionData[key].displayText}
          description={questionData[key].description}
        />
      ))}
      {dropdown}
      {calendar}
    </View>
  );
};

export default FormsScreen;