import * as React from 'react';
import { DefaultTheme } from 'react-native-paper';

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
    interface ThemeFonts {
      display: React.CSSProperties;
      header: React.CSSProperties;
      body: React.CSSProperties;
      bodyBold: React.CSSProperties;
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

  fonts: {
    ...DefaultTheme.fonts,
    display: {
      fontFamily: 'Myriad Pro',
      fontWeight: 600,
      fontSize: 24,
    },

    header: {
      fontFamily: 'Myriad Pro',
      fontWeight: 600,
      fontSize: 16,
    },

    body: {
      fontFamily: 'Myriad Pro',
      fontSize: 14,
    },

    bodyBold: {
      fontFamily: 'Myriad Pro',
      fontWeight: 'bold',
      fontSize: 14,
    },
  },
};

export default GlobalThemes;
