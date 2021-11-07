/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { getAllQuestionsOfType, getClient, setClient } from 'database/queries';
import { Question, Client } from 'types/types';
import LargeInput from 'components/LargeInput/largeInput';
import SmallInput from 'components/SmallInput/smallInput';
import Dropdown from 'components/Dropdown/dropdown';
import Calendar from 'components/Calendar/calendar';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    display: 'flex',
  },
});

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
          setCurrentQuestions(allQuestions.slice(17, 20));
          break;
        case 5:
          sendAnswersToFirebase();
          break;
        default:
          setCurrentQuestions(allQuestions.slice(0, 5));
      }
    }
  }, [screen, allQuestions]);

  return (
    <ScrollView style={styles.container}>
      {currentQuestions.map(question => getQuestionComponent(question))}
      <Button onPress={() => (screen > 0 ? setScreen(screen - 1) : null)}>
        Previous Screen
      </Button>
      <Button onPress={() => setScreen(screen + 1)}> Next Screen </Button>
    </ScrollView>
  );
}
