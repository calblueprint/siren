import React from 'react';
import { QuestionComponentProps } from 'types/types';
import { TextRegularBold } from 'assets/fonts/Fonts';
import {
  InputContainer,
  TextContainer,
  TextInput,
  TextDescription,
} from 'components/Inputs/styles';

export default function SmallInput(props: QuestionComponentProps) {
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
        placeholder={question.example[language]}
        onChangeText={t => setAnswer(question, t)}
        defaultValue={existingAnswer || ''}
      />
    </InputContainer>
  );
}
