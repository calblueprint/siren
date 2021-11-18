/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { getAllQuestionsOfType, getClient, setClient } from 'database/queries';
import { TextSubtitle, TextRegularWhite } from 'assets/fonts/Fonts';
import { ButtonDarkBlue } from 'assets/Components';
import { Question, Client } from 'types/types';
import LargeInput from 'components/LargeInput/largeInput';
import SmallInput from 'components/SmallInput/smallInput';
import Dropdown from 'components/Dropdown/dropdown';
import Calendar from 'components/Calendar/calendar';
import Radio from 'components/Radio/radio';
import {
  ButtonHeader,
  ButtonView,
  ScrollPageContainer,
  QuestionView,
} from './styles';

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
5. TODO: if answer exists, fill it out (answer retention feature)
6. At the last screen, the Manager will send the currentAnswers map to Firebase. TODO: based on current user
*/
export default function GeneralQuestionManager() {
  const [screen, setScreen] = useState(0);
  const [allQuestions, setAllQuestions] = useState([] as Question[]);
  const [currentQuestions, setCurrentQuestions] = useState([] as Question[]);
  const [currentAnswers, setCurrentAnswers] = useState(new Map());

  const setAnswer = (question: Question, input: any): void => {
    setCurrentAnswers(currentAnswers.set(question.key, input));
  };

  const loadQuestions = async (): Promise<void> => {
    const qs: Question[] = await getAllQuestionsOfType('general');
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
      />
    );
  };

  const sendAnswersToFirebase = async () => {
    const client: Client = await getClient('sample');
    if (!Object.prototype.hasOwnProperty.call(client, 'answers')) {
      client.answers = new Map();
    }
    client.answers.set('general', currentAnswers);
    await setClient(client);
  };

  useEffect(() => {
    loadQuestions();
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
          break;
        default:
          setCurrentQuestions(allQuestions.slice(0, 5));
      }
    }
  }, [screen, allQuestions]);

  return (
    <ScrollPageContainer>
      <ButtonHeader onPress={() => (screen > 0 ? setScreen(screen - 1) : null)}>
        <Appbar.BackAction
          size={18}
          style={{ margin: 0 }}
          onPress={() => (screen > 0 ? setScreen(screen - 1) : null)}
        />
        <TextSubtitle>Go Back</TextSubtitle>
      </ButtonHeader>
      <QuestionView>
        {currentQuestions.map(question => getQuestionComponent(question))}
      </QuestionView>
      <ButtonView>
        <ButtonDarkBlue onPress={() => setScreen(screen + 1)}>
          <TextRegularWhite>Next</TextRegularWhite>
        </ButtonDarkBlue>
      </ButtonView>
    </ScrollPageContainer>
  );
}