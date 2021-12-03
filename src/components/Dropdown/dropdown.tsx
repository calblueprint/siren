import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Platform } from 'react-native';
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
  iOSView: {
    width: '74%',
    color: '#2B2B2B',
    borderWidth: 1,
    borderColor: '#2B2B2B',
    borderRadius: 8,
    justifyContent: 'center',
    opacity: 1,
  },
  androidView: {
    width: '74%',
    height: 30,
    color: '#2B2B2B',
    borderWidth: 1,
    borderColor: '#2B2B2B',
    borderRadius: 8,
    justifyContent: 'center',
    opacity: 1,
  },
  iOSTouch: {
    width: '74%',
    height: 30,
    fontSize: 12,
    lineHeight: 7,
    color: '#6A6A6A',
    borderRadius: 8,
    justifyContent: 'center',
  },
  exampleText: {
    paddingLeft: 10,
    fontSize: 12,
    color: '#6A6A6A',
  },
});

export default function Dropdown(props: QuestionComponentProps) {
  const { question, setAnswer, existingAnswer } = props;
  const [value, setValue] = useState(existingAnswer);
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);
  const [isSet, setisSet] = useState(false);
  const onChange = (val: any): void => {
    setShow(false);
    setValue(val);
    setAnswer(question, val);
    setToggle(!toggle);
    setisSet(true);
  };

  const showPicker = (): void => {
    setShow(true);
  };

  const platform = () => {
    if (Platform.OS === 'ios') {
      return (
        <View style={styles.iOSView}>
          <Pressable style={styles.iOSTouch} onPress={showPicker}>
            {isSet ? (
              <Text style={styles.exampleText}>{value}</Text>
            ) : (
              <Text style={styles.exampleText}> {value} </Text>
            )}
          </Pressable>
          {show ? (
            <View>
              <Picker selectedValue={value} onValueChange={onChange}>
                {question.answerOptions
                  ? question.answerOptions.map(option => (
                      <Picker.Item key={option} label={option} value={option} />
                    ))
                  : null}
              </Picker>
            </View>
          ) : null}
        </View>
      );
    }
    return (
      <View style={styles.androidView}>
        <Picker selectedValue={value} onValueChange={onChange}>
          {question.answerOptions
            ? question.answerOptions.map(option => (
                <Picker.Item key={option} label={option} value={option} />
              ))
            : null}
        </Picker>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.displayText}>{question.displayText}</Text>
      {question.description.length > 0 ? (
        <Text style={styles.description}>{question.description}</Text>
      ) : null}
      {platform()}
    </View>
  );
}
