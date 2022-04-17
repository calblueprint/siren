// import { useContext } from 'react';
// import { LanguageContext } from 'context/ContextProvider';
import en from './en.json';
import es from './es.json';
import vie from './vie.json';

export const dictionaryList = { en, es, vie };

export const languageOptions = {
  en: 'English',
  es: 'Spanish',
  vie: 'Vietnamese',
};

// get text according to id & current language
// export function Text({ tid }) {
//   const languageContext = useContext(LanguageContext);

//   return languageContext.dictionary[tid] || tid;
// }
