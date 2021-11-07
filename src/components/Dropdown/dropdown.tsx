import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import { QuestionComponentProps } from 'types/types';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
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

export default function Dropdown(props: QuestionComponentProps) {
  const { question, setAnswer } = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const userOptions: ItemType[] = [];
  if (question.answerOptions) {
    for (let i = 0; i < question.answerOptions.length; i += 1) {
      const item: ItemType = {
        label: question.answerOptions[i],
        value: question.answerOptions[i],
      };
      userOptions.push(item);
    }
  }
  const [items, setItems] = useState(userOptions);

  const onChange = (newValue?: any): void => {
    setAnswer(question, newValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.displayText}>{question.displayText}</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={onChange}
        dropDownDirection="AUTO"
        containerStyle={{
          width: '74%',
          height: 150,
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
