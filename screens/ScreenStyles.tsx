import { StyleSheet } from 'react-native';
import sizes from '../styles/GlobalSpacing';

export default StyleSheet.create({
  root: {
    display: 'flex',
    height: '100%', // cannot use 'mv' in React Native
    flexDirection: 'column',
    paddingHorizontal: 20, // cannot use css shorthand 'x, x, x, x'
    paddingVertical: 40,
  },
  text: {
    fontFamily: 'PTSans_400Regular',
    fontSize: sizes.FONT_MEDIUM,
  },
});
