import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { QuestionComponentProps } from 'types/types';
import { TextRegularBold } from 'assets/fonts/Fonts';
import {
  TextContainer,
  TextDescription,
  TextExample,
} from 'components/Inputs/styles';
import { PlatformContainer } from 'components/Inputs/Dropdown/styles';
import { Colors } from 'assets/Colors';

const styles = StyleSheet.create({
  iOSTouch: {
    height: 30,
    fontSize: 12,
    lineHeight: 7,
    color: Colors.brandGray,
    borderRadius: 8,
    justifyContent: 'center',
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

  const getExampleText = () => {
    return isSet ? value : ` ${value} `;
  };

  const getDescription = () => {
    return question.description.length > 0 ? (
      <TextDescription>{question.description}</TextDescription>
    ) : null;
  };

  const getPlatform = () => {
    if (Platform.OS === 'ios') {
      return (
        <PlatformContainer>
          <Pressable style={styles.iOSTouch} onPress={showPicker}>
            <TextExample>{getExampleText()}</TextExample>
          </Pressable>
          {show ? (
            <View>
              <Picker selectedValue={value} onValueChange={onChange}>
                {question.answerOptions
                  ? question.answerOptions.map(option => (
                      <Picker.Item
                        key={option}
                        label={option}
                        value={!option ? '' : option}
                      />
                    ))
                  : null}
              </Picker>
            </View>
          ) : null}
        </PlatformContainer>
      );
    }
    return (
      <PlatformContainer style={{ height: 30 }}>
        <Picker selectedValue={value} onValueChange={onChange}>
          {question.answerOptions
            ? question.answerOptions.map(option => (
                <Picker.Item
                  key={option}
                  label={option}
                  value={!option ? '' : option}
                />
              ))
            : null}
        </Picker>
      </PlatformContainer>
    );
  };

  return (
    <>
      <TextContainer>
        <TextRegularBold>{question.displayText}</TextRegularBold>
        {getDescription()}
      </TextContainer>
      {getPlatform()}
    </>
  );
}
