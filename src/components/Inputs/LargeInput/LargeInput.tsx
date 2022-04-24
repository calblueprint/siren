import React from 'react';
import { TextRegularBold } from '../../../../assets/fonts/Fonts';
import {
  InputContainer,
  TextContainer,
  TextInput,
  TextDescription,
} from '../../../components/Inputs/styles';
import { QuestionComponentProps } from '../../../types/types';
import { LanguageContext } from '../../../context/ContextProvider';

export default function LargeInput(props: QuestionComponentProps) {
  const { question, setAnswer, existingAnswer } = props;
  const { userLanguage } = React.useContext(LanguageContext);

  const getDescription = () => {
    return question.description.length > 0 ? (
      <TextDescription>{question.description}</TextDescription>
    ) : null;
  };

  return (
    <InputContainer>
      <TextContainer>
        <TextRegularBold>{question.displayText + userLanguage}</TextRegularBold>
        {getDescription()}
      </TextContainer>
      <TextInput
        onChangeText={t => setAnswer(question, t)}
        placeholder={question.example}
        multiline
        numberOfLines={4}
        defaultValue={existingAnswer || ''}
      />
    </InputContainer>
  );
}
