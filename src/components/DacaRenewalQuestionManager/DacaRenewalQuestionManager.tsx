/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { getAllQuestionsOfType, getClient, setClient } from 'database/queries';
import { TextSubtitle, TextRegularWhite } from 'assets/fonts/Fonts';
import { ButtonDarkBlue } from 'assets/Components';
import { Question, Client, QuestionManagerProps } from 'types/types';
import LargeInput from 'components/LargeInput/largeInput';
import SmallInput from 'components/SmallInput/smallInput';
import Dropdown from 'components/Dropdown/dropdown';
import Calendar from 'components/Calendar/calendar';
import Radio from 'components/Radio/radio';
import { ButtonHeader, ButtonView } from './styles';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    paddingTop: 10,
  },
});

export default function DacaRenewalQuestionManager(
  props: QuestionManagerProps,
) {
  const [allQuestions, setAllQuestions] = useState([] as Question[]);
  const [currentAnswers, setCurrentAnswers] = useState(new Map());
  const { setNextScreen } = props;

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
      />
    );
  };

  const sendAnswersToFirebase = async () => {
    const client: Client = await getClient('sample');
    if (!Object.prototype.hasOwnProperty.call(client, 'answers')) {
      client.answers = new Map();
    }
    client.answers.set('dacaRenewal', currentAnswers);
    await setClient(client);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ButtonHeader onPress={() => setNextScreen()}>
        <Appbar.BackAction
          size={18}
          style={{ margin: 0 }}
          onPress={() => setNextScreen()}
        />
        <TextSubtitle>Go Back</TextSubtitle>
      </ButtonHeader>
      <View>
        {allQuestions.map(question => getQuestionComponent(question))}
      </View>
      <ButtonView>
        <ButtonDarkBlue onPress={() => sendAnswersToFirebase()}>
          <TextRegularWhite>Submit</TextRegularWhite>
        </ButtonDarkBlue>
      </ButtonView>
    </ScrollView>
  );
}
