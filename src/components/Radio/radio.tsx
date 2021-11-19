import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { QuestionComponentProps } from 'types/types';
import { TextRegular } from 'assets/fonts/Fonts';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
  },
  displayText: {
    width: '74%',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 17,
    color: '#2B2B2B',
    marginBottom: 8,
  },
  description: {
    width: '74%',
    fontSize: 12,
    lineHeight: 17,
    color: '#6A6A6A',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  radioContainer: {
    display: 'flex',
    width: '80%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default function Radio(props: QuestionComponentProps) {
  const { question, setAnswer } = props;
  const [value, setValue] = useState(null);
  const onChange = (val: any): void => {
    setValue(val);
    setAnswer(question, val);
  };
  const getRadioComponent = (option: any): any => {
    return (
      <View style={styles.buttonContainer} key={option}>
        <RadioButton
          value={option}
          status={value === option ? 'checked' : 'unchecked'}
          onPress={() => onChange(option)}
        />
        <TextRegular onPress={() => onChange(option)}>{option}</TextRegular>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.displayText}>{question.displayText}</Text>
      {question.description.length > 0 ? (
        <Text style={styles.description}>{question.description}</Text>
      ) : null}
      <View style={styles.radioContainer}>
        {question.answerOptions
          ? question.answerOptions.map(option => getRadioComponent(option))
          : null}
      </View>
    </View>
  );
}
