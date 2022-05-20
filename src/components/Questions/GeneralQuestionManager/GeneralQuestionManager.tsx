/* eslint-disable react/style-prop-object */
import React, { SetStateAction, useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import Calendar from 'components/Inputs/Calendar/Calendar';
import Radio from 'components/Inputs/Radio/Radio';
import { ClientContext } from 'context/ContextProvider';
import {
  ButtonHeader,
  ButtonView,
  Container,
} from 'components/Questions/styles';
import {
  getAllQuestionsOfType,
  setClient,
  getAllCases,
  getQuestion,
} from 'database/queries';
import { TextSubtitle, TextRegularWhite } from 'assets/fonts/Fonts';
import { ButtonDarkBlue } from 'assets/Components';
import {
  Question,
  Client,
  QuestionManagerProps,
  MultilingualQuestion,
} from 'types/types';
import LargeInput from 'components/Inputs/LargeInput/LargeInput';
import SmallInput from 'components/Inputs/SmallInput/SmallInput';
import Dropdown from 'components/Inputs/Dropdown/Dropdown';
import firebase from 'firebase';

/*
GeneralQuestionManager is the wrapper for all the "general" type questions on the intake
form. 

Here's the way it works:
0. We poll Firestore for all "general questions" and save it into allQuestions
1. There's a hardcoded screen number, and the Manager will display certain questions based on the screen number.
2. Based on the screen number, currentQuestions holds all the questions that should be displayed.
3. The Manager will dynamically render the Question Component based on its AnswerType (i.e smallInput, calendar, etc)
4. We pass a setAnswer function down in props to all the Question Components so we can save the user's answers
   in the Manager's state.
5. If answer exists, prefill it out
6. At the last screen, the Manager will send the currentAnswers map to Firebase. 
*/
export default function GeneralQuestionManager(props: QuestionManagerProps) {
  const [allQuestions, setAllQuestions] = useState([] as Question[]);
  const [currentQuestions, setCurrentQuestions] = useState([] as Question[]);
  const { setNextScreen, existingAnswers, managerSpecificProps } = props;
  const [currentAnswers, setCurrentAnswers] = useState(
    existingAnswers.get('general') || new Map(),
  );
  const [screen, setScreen] = useState(managerSpecificProps?.screen || 0);
  const { state } = React.useContext(ClientContext);
  const client: Client = state;
  const langStr = client.language;
  const finalGeneralScreen = 5;
  const uid = firebase.auth().currentUser?.uid;
  const [cases, setCases] = useState([]);
  const [filledCase, setFilledCase] = useState(false);
  const caseTypes = new Map<string, string>([
    ['I90', 'I-90'],
    ['adjustmentOfStatus', 'Adjustment of status'],
    ['citizenship', 'Citizenship'],
    ['dacaRenewal', 'DACA renewal'],
  ]);
  const languages = ['EN', 'ES', 'VIET'];
  const [visitReasons, setVisitReasons] = useState(null);

  const setAnswer = (question: Question, input: any): void => {
    setCurrentAnswers(currentAnswers.set(question.key, input));
  };

  const getVisitReason = (visitReason: string) => {
    let index = -1;
    // eslint-disable-next-line no-return-assign
    languages.map(lang =>
      // eslint-disable-next-line no-nested-ternary
      visitReasons
        ? (visitReasons[lang] as Array<string>).includes(visitReason)
          ? (index = visitReasons
              ? (visitReasons[lang] as Array<string>).indexOf(visitReason)
              : -1)
          : null
        : null,
    );
    return visitReasons
      ? (visitReasons as MultilingualQuestion).EN[index]
      : null;
  };

  const handleNext = () => {
    if (screen === finalGeneralScreen) {
      setFilledCase(false);
      if (currentAnswers.get('visitReason')) {
        if (cases.includes(currentAnswers.get('visitReason') as never)) {
          setFilledCase(true);
        } else {
          setScreen(screen + 1);
        }
      }
    } else {
      setScreen(screen + 1);
    }
  };

  const loadQuestions = async (): Promise<void> => {
    const qs: Question[] = await getAllQuestionsOfType('general');
    setAllQuestions(qs);
    const vr = (await getQuestion('7Y1pxuiOEe7Z6eiFtkX7', 'general'))
      .answerOptions;
    setVisitReasons(vr as unknown as SetStateAction<null>);
  };
  const loadCases = async (): Promise<void> => {
    const clientCases = await getAllCases(uid as string);
    setCases(
      clientCases.map(c => caseTypes.get(c.type)) as SetStateAction<never[]>,
    );
  };
  const getQuestionComponent = (question: Question, id: number) => {
    // id solves duplicate keys React error
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
        key={id}
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
    if (!client) {
      return;
    }
    if (!Object.prototype.hasOwnProperty.call(client, 'answers')) {
      client.answers = new Map();
    }
    client.answers.set('general', currentAnswers);
    await setClient(client);
  };

  useEffect(() => {
    loadQuestions();
    loadCases();
  }, []);

  useEffect(() => {
    if (allQuestions) {
      switch (screen) {
        case 0: {
          setCurrentQuestions(allQuestions.slice(0, 5));
          break;
        }
        case 1:
          setCurrentQuestions(allQuestions.slice(5, 10));
          break;
        case 2:
          setCurrentQuestions(allQuestions.slice(10, 13));
          break;
        case 3:
          setCurrentQuestions(allQuestions.slice(13, 17));
          break;
        case 4:
          setCurrentQuestions(allQuestions.slice(17, 18));
          break;
        case 5:
          setCurrentQuestions(allQuestions.slice(18, 24));
          break;
        case 6:
          sendAnswersToFirebase();
          setNextScreen(
            getVisitReason(currentAnswers.get('visitReason')) as string,
          );
          break;
        default:
          setCurrentQuestions(allQuestions.slice(0, 5));
      }
    }
  }, [screen, allQuestions, existingAnswers]);

  const goBack = () => {
    if (screen > 0) {
      setScreen(screen - 1);
    } else {
      // eslint-disable-next-line react/destructuring-assignment
      props.goBack();
    }
  };

  return (
    <Container>
      <ButtonHeader onPress={goBack}>
        <Appbar.BackAction size={18} style={{ margin: 0 }} onPress={goBack} />
        <TextSubtitle>Go Back</TextSubtitle>
      </ButtonHeader>
      {currentQuestions.map((question, id) =>
        getQuestionComponent(question, id),
      )}
      {filledCase ? <p>Already filled out a form for this case.</p> : null}
      <ButtonView>
        <ButtonDarkBlue onPress={() => handleNext()}>
          <TextRegularWhite>Next</TextRegularWhite>
        </ButtonDarkBlue>
      </ButtonView>
    </Container>
  );
}
