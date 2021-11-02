/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getAllQuestionsOfType } from '../firebase/queries';
import { Question } from '../types/types';
import LargeInput from '../questions/largeInput';
import SmallInput from '../questions/smallInput';
import Dropdown from '../questions/dropdown';
import Calendar from '../questions/calendar';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});

export default function GeneralQuestionManager() {
  const [screen, setScreen] = useState(0);
  const [allQuestions, setAllQuestions] = useState([] as Question[]);
  const [currentQuestions, setCurrentQuestions] = useState([] as Question[]);
  const answerComponents = {
    largeInput: LargeInput,
    smallInput: SmallInput,
    dropdown: Dropdown,
    calendar: Calendar,
  };

  const loadQuestions = async (): Promise<void> => {
    const qs: Question[] = await getAllQuestionsOfType('general');
    setAllQuestions(qs);
  };
  const getQuestionComponent = (question: Question) => {
    const QuestionComponent = answerComponents[question.answerType];
    return <QuestionComponent {...question} />;
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    if (allQuestions) {
      switch (screen) {
        case 0:
          setCurrentQuestions(allQuestions.slice(0, 5));
          break;
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
        default:
          setCurrentQuestions(allQuestions.slice(0, 5));
      }
    }
  }, [screen, allQuestions]);

  return (
    <View style={styles.container}>
      <Text>SIREN Questions</Text>
      {currentQuestions.map(question => getQuestionComponent(question))}
      <button
        type="button"
        onClick={() => (screen > 0 ? setScreen(screen - 1) : null)}
      >
        Previous Screen
      </button>
      <button type="button" onClick={() => setScreen(screen + 1)}>
        Next Screen
      </button>
    </View>
  );
}
