import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
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
});

export default function Dropdown(question: Question) {
  const { answerOptions, displayText } = question;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const userOptions: ItemType[] = [];
  if (answerOptions) {
    for (let i = 0; i < answerOptions.length; i += 1) {
      const item: ItemType = {
        label: answerOptions[i],
        value: answerOptions[i],
      };
      userOptions.push(item);
    }
  }
  const [items, setItems] = useState(userOptions);

  return (
    <View style={styles.container}>
      <Text style={styles.displayText}>{displayText}</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        containerStyle={{
          width: '74%',
          height: 50,
          borderColor: '#2B2B2B',
          borderRadius: 8,
        }}
        labelStyle={{
          color: '#2B2B2B',
        }}
        textStyle={{
          fontSize: 14,
          lineHeight: 17,
        }}
      />
    </View>
  );
}
