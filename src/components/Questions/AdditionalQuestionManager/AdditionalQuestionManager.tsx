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
  CaseStatus,
} from 'types/types';
import LargeInput from 'components/Inputs/LargeInput/LargeInput';
import SmallInput from 'components/Inputs/SmallInput/SmallInput';
import Dropdown from 'components/Inputs/Dropdown/Dropdown';
import Calendar from 'components/Inputs/Calendar/Calendar';
import Radio from 'components/Inputs/Radio/Radio';
import { ClientContext } from 'context/ContextProvider';
import { firestoreAutoId } from 'database/helpers';
import {
  ButtonHeader,
  ButtonView,
  Container,
} from 'components/Questions/styles';

export default function AdditionalQuestionManager(props: QuestionManagerProps) {
  const [allQuestions, setAllQuestions] = useState([] as Question[]);
  const {
    setPreviousScreen,
    setNextScreen,
    existingAnswers,
    managerSpecificProps,
  } = props;
  const caseType = managerSpecificProps?.caseType;
  const [currentAnswers, setCurrentAnswers] = useState(
    existingAnswers?.get(caseType) || new Map(),
  );
  const { state } = React.useContext(ClientContext);

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
    return (
      <QuestionComponent
        key={question.displayText}
        question={question}
        setAnswer={setAnswer}
        existingAnswer={
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
    // TODO: case type from visitReason
    const clientCase: Case = {
      id: firestoreAutoId(),
      status: CaseStatus.SubmitDoc,
      type: caseType,
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
          <TextRegularWhite>Submit</TextRegularWhite>
        </ButtonDarkBlue>
      </ButtonView>
    </Container>
  );
}
