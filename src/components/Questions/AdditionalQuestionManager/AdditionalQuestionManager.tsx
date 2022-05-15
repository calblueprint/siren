/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import {
  getAllQuestionsOfType,
  setCaseAndNumCases,
  setClient,
} from 'database/queries';
import { TextSubtitle, TextRegularWhite } from 'assets/fonts/Fonts';
import { ButtonDarkBlue } from 'assets/Components';
import { Question, Client, QuestionManagerProps } from 'types/types';
import LargeInput from 'components/Inputs/LargeInput/LargeInput';
import SmallInput from 'components/Inputs/SmallInput/SmallInput';
import Dropdown from 'components/Inputs/Dropdown/Dropdown';
import Calendar from 'components/Inputs/Calendar/Calendar';
import Radio from 'components/Inputs/Radio/Radio';
import { ClientContext } from 'context/ContextProvider';
import {
  ButtonHeader,
  ButtonView,
  Container,
} from 'components/Questions/styles';
import { LanguageContext } from 'context/ContextProvider';

export default function AdditionalQuestionManager(props: QuestionManagerProps) {
  const [allQuestions, setAllQuestions] = useState([] as Question[]);
  const {
    setPreviousScreen,
    setNextScreen,
    existingAnswers,
    managerSpecificProps,
    isUpdating,
  } = props;
  const caseType = managerSpecificProps?.caseType;
  const [currentAnswers, setCurrentAnswers] = useState(
    existingAnswers?.get(caseType) || new Map(),
  );
  const { state } = React.useContext(ClientContext);
  const { userLanguage } = React.useContext(LanguageContext);

  const setAnswer = (question: Question, input: any): void => {
    setCurrentAnswers(currentAnswers.set(question.key, input));
  };

  const loadQuestions = async (): Promise<void> => {
    const qs: Question[] = await getAllQuestionsOfType(caseType);
    setAllQuestions(qs);
  };
  const getQuestionComponent = (question: Question) => {
    const answerComponents = {
      largeInput: LargeInput,
      smallInput: SmallInput,
      dropdown: Dropdown,
      calendar: Calendar,
      radio: Radio,
    };
    const QuestionComponent = answerComponents[question.answerType];
    const existToCurrentAnswers = (): void => {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of existingAnswers.get(caseType)) {
        if (!currentAnswers.has(key)) {
          currentAnswers.set(key, value);
        }
      }
    };
    // eslint-disable-next-line no-lone-blocks
    {
      // eslint-disable-next-line no-unused-expressions
      isUpdating ? existToCurrentAnswers() : null;
    }
    return (
      <QuestionComponent
        key={question.displayText.get(userLanguage)}
        question={question}
        setAnswer={setAnswer}
        existingAnswer={
          // eslint-disable-next-line no-nested-ternary
          currentAnswers.has(question.key)
            ? currentAnswers.get(question.key)
            : null
        }
      />
    );
  };

  const sendAnswersToFirebase = async () => {
    const client: Client = state;
    if (!client) {
      return;
    }
    if (!Object.prototype.hasOwnProperty.call(client, 'answers')) {
      client.answers = new Map();
    }
    client.answers.set(caseType, currentAnswers);
    await setClient(client);
    if (!isUpdating) {
      await setCaseAndNumCases(client.id, caseType);
    }
  };

  const goToNextScreen = () => {
    sendAnswersToFirebase();
    setNextScreen();
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  return (
    <Container>
      <ButtonHeader
        onPress={() => (setPreviousScreen ? setPreviousScreen() : null)}
      >
        <Appbar.BackAction
          size={18}
          style={{ margin: 0 }}
          onPress={() => (setPreviousScreen ? setPreviousScreen() : null)}
        />
        <TextSubtitle>Go Back</TextSubtitle>
      </ButtonHeader>
      {allQuestions.map(question => getQuestionComponent(question))}
      <ButtonView>
        <ButtonDarkBlue onPress={() => goToNextScreen()}>
          <TextRegularWhite>
            {isUpdating ? 'Update' : 'Submit'}
          </TextRegularWhite>
        </ButtonDarkBlue>
      </ButtonView>
    </Container>
  );
}
