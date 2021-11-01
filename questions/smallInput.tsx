import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Question } from '../types/types';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 24,
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
    height: '4.46%',
    fontSize: 12,
    lineHeight: 14,
    color: '#6A6A6A',
    borderWidth: 1,
    borderColor: '#2B2B2B',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
});

export default function SmallInput(question: Question) {
  const { displayText, description, example } = question;
  return (
    <View style={styles.container}>
      <Text style={styles.displayText}>{displayText}</Text>
      <Text style={styles.description}>{description}</Text>
      <TextInput style={styles.example} placeholder={example} />
    </View>
  );
}
