/* eslint-disable no-restricted-imports */
import React from 'react';
import { TextRegularBold } from 'assets/fonts/Fonts';
import { QuestionComponentProps } from 'types/types';
import { ClientContext } from 'context/ContextProvider';
import {
  InputContainer,
  TextContainer,
  TextInput,
  TextDescription,
} from '../styles';

export default function LargeInput(props: QuestionComponentProps) {
  const { question, setAnswer, existingAnswer } = props;
  const { state } = React.useContext(ClientContext);
  const langStr = state.language;

  const getDescription = () => {
    if (question?.description?.get(langStr)?.length) {
      return (
        <TextDescription>{question.description.get(langStr)}</TextDescription>
      );
    }
    return null;
  };

  return (
    <InputContainer>
      <TextContainer>
        <TextRegularBold>{question.displayText.get(langStr)}</TextRegularBold>
        {getDescription()}
      </TextContainer>
      <TextInput
        onChangeText={t => setAnswer(question, t)}
        placeholder={question.example.get(langStr)}
        multiline
        numberOfLines={4}
        defaultValue={existingAnswer || ''}
      />
    </InputContainer>
  );
}
