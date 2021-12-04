import React from 'react';
import { TextRegularBold, TextSubtitle } from 'assets/fonts/Fonts';
import {
  InputContainer,
  TextContainer,
  TextInput,
} from 'components/LargeInput/styles';
import { QuestionComponentProps } from 'types/types';

export default function LargeInput(props: QuestionComponentProps) {
  const { question, setAnswer, existingAnswer } = props;
  return (
    <InputContainer>
      <TextContainer>
        <TextRegularBold>{question.displayText}</TextRegularBold>
        {question.description.length > 0 ? (
          <TextSubtitle>{question.description}</TextSubtitle>
        ) : null}
      </TextContainer>
      <TextInput
        onChangeText={t => setAnswer(question, t)}
        placeholder={question.example}
        multiline
        defaultValue={existingAnswer || ''}
      />
    </InputContainer>
  );
}
