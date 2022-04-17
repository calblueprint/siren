import en from './languages/en.json';
import es from './languages/es.json';
import vie from './languages/vie.json';
import { useContext } from 'react';
import { LanguageContext } from 'context/ContextProvider';

export const dictionaryList = { en, es, vie };

export const languageOptions = {
  en: 'English',
  es: 'Spanish',
  vie: 'Vietnamese',
};
