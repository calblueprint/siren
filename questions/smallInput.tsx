import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { QuestionComponentProps } from '../types/types';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
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
    height: 17,
    fontSize: 14,
    lineHeight: 17,
    color: '#6A6A6A',
    marginBottom: 8,
  },
  example: {
    width: '74%',
    height: 50,
    fontSize: 12,
    lineHeight: 7,
    color: '#6A6A6A',
    borderWidth: 1,
    borderColor: '#2B2B2B',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
});

export default function SmallInput(props: QuestionComponentProps) {
  const { question, setAnswer } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.displayText}>{question.displayText}</Text>
      <Text style={styles.description}>{question.description}</Text>
      <TextInput
        style={styles.example}
        placeholder={question.example}
        onChangeText={t => setAnswer(question, t)}
      />
    </View>
  );
}
