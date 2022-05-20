import React from 'react';
import { ClientContext } from 'context/ContextProvider';
import { QuestionComponentProps } from 'types/types';
import { TextRegularBold } from 'assets/fonts/Fonts';
// eslint-disable-next-line no-restricted-imports
import {
  InputContainer,
  TextContainer,
  TextInput,
  TextDescription,
} from '../styles';

export default function SmallInput(props: QuestionComponentProps) {
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
        placeholder={question.example.get(langStr)}
        onChangeText={t => setAnswer(question, t)}
        defaultValue={existingAnswer || ''}
      />
    </InputContainer>
  );
}
