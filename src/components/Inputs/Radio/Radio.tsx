import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';
import { QuestionComponentProps } from '../../../types/types';
import { TextRegularBold, TextRegular } from '../../../../assets/fonts/Fonts';
import {
  ButtonContainer,
  RadioContainer,
} from '../../../components/Inputs/Radio/styles';
import {
  TextContainer,
  TextDescription,
} from '../../../components/Inputs/styles';
import { LanguageContext } from '../../../context/ContextProvider';

export default function Radio(props: QuestionComponentProps) {
  const { question, setAnswer, existingAnswer } = props;
  const [value, setValue] = useState(existingAnswer);
  const { userLanguage } = React.useContext(LanguageContext);

  const onChange = (val: any): void => {
    setValue(val);
    setAnswer(question, val);
  };

  const getDescription = () => {
    return question.description.length > 0 ? (
      <TextDescription>{question.description}</TextDescription>
    ) : null;
  };

  return (
    <TextContainer>
      <TextRegularBold>{question.displayText + userLanguage}</TextRegularBold>
      {getDescription()}
      <RadioContainer>
        {question.answerOptions?.map((option, key) => (
          // eslint-disable-next-line react/no-array-index-key
          <ButtonContainer key={key}>
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
