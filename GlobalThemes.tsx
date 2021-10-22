import * as React from 'react';
import { DefaultTheme } from 'react-native-paper';
import { Fonts } from 'react-native-paper/lib/typescript/types';

declare global {
    namespace ReactNativePaper {
        interface ThemeColors { 
            activeNavIcon: string;
            incompleteTask: string;
            darkButtonText: string;
            lightButtonText: string;
            completeTask: string;
            placeholderText: string;
        }
        interface ThemeFonts { 
            buttonFont: string;
        }

        interface Theme { 
            buttonRad: number;
        }
    }
}

const GlobalThemes: ReactNativePaper.Theme = {
    ...DefaultTheme,
    buttonRad: 8,
    colors: {
        ...DefaultTheme.colors,

        activeNavIcon: '#F3C8CC',
        incompleteTask: '#C92C3C',
        darkButtonText: '#FFFFFF',
        lightButtonText: '#2B2B2B',
        completeTask: '#9FC5E5',
        placeholderText: '#6A6A6A',
    },
    fonts: {
        ...DefaultTheme.fonts,
        buttonFont: 'Myriad Pro',
    },
    
};

export default GlobalThemes;