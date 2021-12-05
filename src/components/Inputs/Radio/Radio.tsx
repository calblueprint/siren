import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';
import { QuestionComponentProps } from 'types/types';
import { TextRegularBold, TextRegular } from 'assets/fonts/Fonts';
import {
  ButtonContainer,
  RadioContainer,
} from 'components/Inputs/Radio/styles';
import { TextContainer, TextDescription } from 'components/Inputs/styles';

export default function Radio(props: QuestionComponentProps) {
  const { question, setAnswer, existingAnswer } = props;
  const [value, setValue] = useState(existingAnswer);

  const onChange = (val: any): void => {
    setValue(val);
    setAnswer(question, val);
  };

  const getRadioComponent = (option: any): any => {
    return (
      <ButtonContainer>
        <RadioButton
          value={option}
          status={value === option ? 'checked' : 'unchecked'}
          onPress={() => onChange(option)}
        />
        <TextRegular onPress={() => onChange(option)}>{option}</TextRegular>
      </ButtonContainer>
    );
  };

  const getDescription = () => {
    return question.description.length > 0 ? (
      <TextDescription>{question.description}</TextDescription>
    ) : null;
  };

  return (
    <TextContainer>
      <TextRegularBold>{question.displayText}</TextRegularBold>
      {getDescription()}
      <RadioContainer>
        {question.answerOptions
          ? question.answerOptions.map(option => getRadioComponent(option))
          : null}
      </RadioContainer>
    </TextContainer>
  );
}
