/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { getAllQuestionsOfType, setCase, setClient } from 'database/queries';
import { TextSubtitle, TextRegularWhite } from 'assets/fonts/Fonts';
import { ButtonDarkBlue } from 'assets/Components';
import {
  Question,
  Client,
  QuestionManagerProps,
  Case,
  CaseType,
  CaseStatus,
} from 'types/types';
import LargeInput from 'components/LargeInput/largeInput';
import SmallInput from 'components/SmallInput/smallInput';
import Dropdown from 'components/Dropdown/dropdown';
import Calendar from 'components/Calendar/calendar';
import Radio from 'components/Radio/radio';
import { getCurrentClient } from 'database/auth';
import { firestoreAutoId } from 'database/helpers';
import { ButtonHeader, ButtonView } from './styles';

export default function DacaRenewalQuestionManager(
  props: QuestionManagerProps,
) {
  const [allQuestions, setAllQuestions] = useState([] as Question[]);
  const [currentAnswers, setCurrentAnswers] = useState(new Map());
  const { setPreviousScreen, setNextScreen, existingAnswers } = props;

  const setAnswer = (question: Question, input: any): void => {
    setCurrentAnswers(currentAnswers.set(question.key, input));
  };

  const loadQuestions = async (): Promise<void> => {
    const qs: Question[] = await getAllQuestionsOfType('dacaRenewal');
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
    return (
      <QuestionComponent
        key={question.displayText}
        question={question}
        setAnswer={setAnswer}
        existingAnswer={
          currentAnswers.has(question.key)
            ? currentAnswers.get(question.key)
            : existingAnswers.get('general')?.get(question.key) || null
        }
      />
    );
  };

  const sendAnswersToFirebase = async () => {
    const client: Client | undefined = await getCurrentClient();
    if (!client) {
      return;
    }
    if (!Object.prototype.hasOwnProperty.call(client, 'answers')) {
      client.answers = new Map();
    }
    client.answers.set('dacaRenewal', currentAnswers);
    await setClient(client);
    const clientCase: Case = {
      id: firestoreAutoId(),
      status: CaseStatus.SubmitDoc,
      type: CaseType.DacaRenewal,
    };
    await setCase(client.id, clientCase);
  };

  const goToNextScreen = () => {
    sendAnswersToFirebase();
    setNextScreen();
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  return (
    <>
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
          <TextRegularWhite>Submit</TextRegularWhite>
        </ButtonDarkBlue>
      </ButtonView>
    </>
  );
}
