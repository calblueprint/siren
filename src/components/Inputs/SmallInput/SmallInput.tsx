import React from 'react';
import { QuestionComponentProps } from '../../../types/types';
import { TextRegularBold } from '../../../../assets/fonts/Fonts';
import {
  InputContainer,
  TextContainer,
  TextInput,
  TextDescription,
} from '../styles';
import { LanguageContext } from '../../../context/ContextProvider';

export default function SmallInput(props: QuestionComponentProps) {
  const { question, setAnswer, existingAnswer } = props;
  const { userLanguage } = React.useContext(LanguageContext);

  const getDescription = () => {
    return question.description.get(userLanguage).length > 0 ? (
      <TextDescription>
        {question.description.get(userLanguage)}
      </TextDescription>
    ) : null;
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
