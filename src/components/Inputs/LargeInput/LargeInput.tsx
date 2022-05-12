import React from 'react';
import { TextRegularBold } from 'assets/fonts/Fonts';
import {
  InputContainer,
  TextContainer,
  TextInput,
  TextDescription,
} from 'components/Inputs/styles';
import { QuestionComponentProps } from 'types/types';

export default function LargeInput(props: QuestionComponentProps) {
  const { question, setAnswer, existingAnswer, language } = props;

  const getDescription = () => {
    return question.description[language].length > 0 ? (
      <TextDescription>{question.description[language]}</TextDescription>
    ) : null;
  };

  return (
    <InputContainer>
      <TextContainer>
        <TextRegularBold>{question.displayText[language]}</TextRegularBold>
        {getDescription()}
      </TextContainer>
      <TextInput
        onChangeText={t => setAnswer(question, t)}
        placeholder={question.example[language]}
        multiline
        numberOfLines={4}
        defaultValue={existingAnswer || ''}
      />
    </InputContainer>
  );
}
