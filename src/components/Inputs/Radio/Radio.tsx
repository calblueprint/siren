import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';
import { QuestionComponentProps } from 'types/types';
import { TextRegularBold, TextRegular } from 'assets/fonts/Fonts';
import { ClientContext } from 'context/ContextProvider';
import { ButtonContainer, RadioContainer } from './styles';
// eslint-disable-next-line no-restricted-imports
import { TextContainer, TextDescription } from '../styles';

export default function Radio(props: QuestionComponentProps) {
  const { question, setAnswer, existingAnswer } = props;
  const [value, setValue] = useState(existingAnswer);
  const { state } = React.useContext(ClientContext);
  const langStr = state.language;

  const onChange = (val: any): void => {
    setValue(val);
    setAnswer(question, val);
  };

  const getDescription = () => {
    if (question?.description?.get(langStr)?.length) {
      return (
        <TextDescription>{question.description.get(langStr)}</TextDescription>
      );
    }
    return null;
  };

  return (
    <TextContainer>
      <TextRegularBold>{question.displayText.get(langStr)}</TextRegularBold>
      {getDescription()}
      <RadioContainer>
        {question?.answerOptions?.get(langStr)?.map(option => (
          <ButtonContainer key={option}>
            <RadioButton
              value={option}
              status={value === option ? 'checked' : 'unchecked'}
              onPress={() => onChange(option)}
            />
            <TextRegular onPress={() => onChange(option)}>{option}</TextRegular>
          </ButtonContainer>
        ))}
      </RadioContainer>
    </TextContainer>
  );
}
