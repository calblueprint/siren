import { DefaultTheme } from 'react-native-paper';

// TO DO: ADD SPACING / TEXT SIZE

/* FONTS INCOMPATIBLE 
  React-Native-Paper lacks support for custom Typography in Typescript
  Site example does not work: 
  https://github.com/callstack/react-native-paper/blob/main/example/src/index.tsx
*/

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      babyPink: string;
      cardinal: string;
      jetBlack: string;
      paleCerulian: string;
      dimGray: string;
      prussianBlue: string;
      white: string;
    }
  }
}

// eslint-disable-next-line no-undef
const GlobalThemes: ReactNativePaper.Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    babyPink: '#F3C8CC',
    cardinal: '#C92C3C',
    jetBlack: '#2B2B2B',
    paleCerulian: '#9FC5E5',
    dimGray: '#6A6A6A',
    prussianBlue: '#0F2536',
    white: '#FFFFFF',
  },
};

export default GlobalThemes;
