import React from 'react';
import { LanguageContext } from 'context/ContextProvider';
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
  const { userLanguage } = React.useContext(LanguageContext);

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

  return (
    <InputContainer>
      <TextContainer>
        <TextRegularBold>
          {question.displayText.get(userLanguage)}
        </TextRegularBold>
        {getDescription()}
      </TextContainer>
      <TextInput
        placeholder={question.example.get(userLanguage)}
        onChangeText={t => setAnswer(question, t)}
        defaultValue={existingAnswer || ''}
      />
    </InputContainer>
  );
}
