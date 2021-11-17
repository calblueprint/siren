import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { QuestionComponentProps } from 'types/types';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
  },
  displayText: {
    width: '74%',
    height: 17,
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
  pickerView: {
    width: '74%',
    height: 30,
    color: '#2B2B2B',
    borderWidth: 1,
    borderColor: '#2B2B2B',
    borderRadius: 8,
    justifyContent: 'center',
  },
  pickerItem: {
    fontSize: 14,
    lineHeight: 2,
  },
});

export default function Dropdown(props: QuestionComponentProps) {
  const { question, setAnswer, existingAnswer } = props;
  const [value, setValue] = useState(existingAnswer);
  const onChange = (val: any): void => {
    setValue(val);
    setAnswer(question, val);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.displayText}>{question.displayText}</Text>
      {question.description.length > 0 ? (
        <Text style={styles.description}>{question.description}</Text>
      ) : null}
      <View style={styles.pickerView}>
        <Picker selectedValue={value} onValueChange={onChange}>
          {question.answerOptions
            ? question.answerOptions.map(option => (
                <Picker.Item
                  key={option}
                  label={option}
                  value={option}
                  style={styles.pickerItem}
                />
              ))
            : null}
        </Picker>
      </View>
    </View>
  );
}
