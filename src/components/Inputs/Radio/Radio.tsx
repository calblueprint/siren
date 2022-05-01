import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';
import { QuestionComponentProps } from 'types/types';
import { TextRegularBold, TextRegular } from 'assets/fonts/Fonts';
import { LanguageContext } from 'context/ContextProvider';
import { ButtonContainer, RadioContainer } from './styles';
// eslint-disable-next-line no-restricted-imports
import { TextContainer, TextDescription } from '../styles';

export default function Radio(props: QuestionComponentProps) {
  const { question, setAnswer, existingAnswer } = props;
  const [value, setValue] = useState(existingAnswer);
  const { userLanguage } = React.useContext(LanguageContext);

  const onChange = (val: any): void => {
    setValue(val);
    setAnswer(question, val);
  };

  const getDescription = () => {
    return question.description.get(userLanguage).length > 0 ? (
      <TextDescription>
        {question.description.get(userLanguage)}
      </TextDescription>
    ) : null;
  };

  return (
    <TextContainer>
      <TextRegularBold>
        {question.displayText.get(userLanguage)}
      </TextRegularBold>
      {getDescription()}
      <RadioContainer>
        {question.answerOptions.get(userLanguage)?.map((option, key) => (
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
