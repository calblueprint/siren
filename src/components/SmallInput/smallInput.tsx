import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { QuestionComponentProps } from 'types/types';
import { TextInput } from 'assets/Components';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
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
  example: {
    width: '74%',
  },
});

export default function SmallInput(props: QuestionComponentProps) {
  const { question, setAnswer } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.displayText}>{question.displayText}</Text>
      {question.description.length > 0 ? (
        <Text style={styles.description}>{question.description}</Text>
      ) : null}
      <TextInput
        style={styles.example}
        placeholder={question.example}
        onChangeText={t => setAnswer(question, t)}
      />
    </View>
  );
}
