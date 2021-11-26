import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { QuestionComponentProps } from 'types/types';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 24,
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
  input: {
    width: '74%',
    fontSize: 12,
    lineHeight: 14,
    color: '#6A6A6A',
    borderWidth: 1,
    borderColor: '#2B2B2B',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'top',
  },
});

export default function LargeInput(props: QuestionComponentProps) {
  const { question, setAnswer, existingAnswer } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.displayText}>{question.displayText}</Text>
      {question.description.length > 0 ? (
        <Text style={styles.description}>{question.description}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        onChangeText={t => setAnswer(question, t)}
        placeholder={question.example}
        multiline
        defaultValue={existingAnswer || ''}
      />
    </View>
  );
}
