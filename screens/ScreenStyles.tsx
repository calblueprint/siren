import { StyleSheet } from 'react-native';
import spaces from '../styles/GlobalSpacing';

export default StyleSheet.create({
  root: {
    display: 'flex',
    height: '100%', // cannot use 'mv' in React Native
    alignItems: 'center',
    flexDirection: 'column',
    padding: spaces.PADDING,
  },
  text: {
    fontFamily: 'PTSans_400Regular',
    fontSize: spaces.FONT_MEDIUM,
    // fontWeight: spaces.FONT_WEIGHT_NORMAL, // this works, but hates you
  },
});
