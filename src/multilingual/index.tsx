import EN from './languages/en.json';
import ES from './languages/es.json';
import VIE from './languages/vie.json';
import { useContext } from 'react';
import { LanguageContext } from '../context/ContextProvider';

export const dictionaryList = { EN, ES, VIE };

export const languageOptions = {
  EN: 'English',
  ES: 'Spanish',
  VIE: 'Vietnamese',
};
