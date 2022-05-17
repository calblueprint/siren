import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { QuestionComponentProps } from 'types/types';
import { TextRegularBold } from 'assets/fonts/Fonts';
import { Colors } from 'assets/Colors';
import { LanguageContext } from 'context/ContextProvider';
// eslint-disable-next-line no-restricted-imports
import { TextContainer, TextDescription, TextExample } from '../styles';
import { PlatformContainer } from './styles';

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
  const { userLanguage } = React.useContext(LanguageContext);

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
    if (question?.description?.get(userLanguage)?.length) {
      return (
        <TextDescription>
          {question.description.get(userLanguage)}
        </TextDescription>
      );
    }
    return null;
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
                {/* {console.log(question)} */}
                {question?.answerOptions?.get(userLanguage)?.map(option => (
                  <Picker.Item
                    key={option}
                    label={option}
                    value={!option ? '' : option}
                  />
                ))}
              </Picker>
            </View>
          ) : null}
        </PlatformContainer>
      );
    }
    return (
      <PlatformContainer style={{ height: 30 }}>
        <Picker selectedValue={value} onValueChange={onChange}>
          {question?.answerOptions?.get(userLanguage)?.map(option => (
            <Picker.Item
              key={option}
              label={option}
              value={!option ? '' : option}
            />
          ))}
        </Picker>
      </PlatformContainer>
    );
  };

  return (
    <>
      <TextContainer>
        <TextRegularBold>
          {question.displayText.get(userLanguage)}
        </TextRegularBold>
        {getDescription()}
      </TextContainer>
      {getPlatform()}
    </>
  );
}
