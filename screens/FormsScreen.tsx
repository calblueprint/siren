import React from 'react';
import { View, StyleSheet } from 'react-native';
import renderSmallText from '../questions/smallInput';
import renderLargeText from '../questions/largeInput';
import renderDropdown from '../questions/dropdown';
import renderCalendar from '../questions/calendar';

export const styles = StyleSheet.create({
  questions: {
    top: '16%',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
});

const FormsScreen = () => {

  const smallInput = renderSmallText();
  const largeInput = renderLargeText();
  const dropdown = renderDropdown();
  const calendar = renderCalendar()

  return (
    <View style={styles.questions}>
      {smallInput}
      {largeInput}
      {dropdown}
      {calendar}
    </View>
  );
};

export default FormsScreen;
