import React, { useContext, useEffect, useState } from 'react';
import { Client } from 'types/types';
import { getEmptyClient } from 'utils/utils';
import en from 'lang/en.json';
import sp from 'lang/sp.json';
import viet from 'lang/viet.json';
import * as RNLocalize from 'react-native-localize';

// general function for creating a context
const createContext = <A extends {} | null>(defaultValue: A) => {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    state: defaultValue,
    update: defaultUpdate,
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [state, update] = React.useState(defaultValue);
    return <ctx.Provider value={{ state, update }} {...props} />;
  }
  return [ctx, Provider] as const; // alternatively, [typeof ctx, typeof Provider]
};

// create a context for the current logged in client
const [context, provider] = createContext<Client>(getEmptyClient());
export const ClientProvider = provider; // used in App.tsx
export const ClientContext = context; // used by client context consumers

// // create a context for language prefference
// const [langContext, langProvider] = createContext<String>('english'); // default: english
// export const LanguageProvider = langProvider;
// export const LanguageContext = langContext;

// it provides the language context to app

type LanguageContextType = {
  hello: string;
};

const LanguageContext = createContext<LanguageContextType>(
  {} as LanguageContextType,
);

const languageObj = {
  en: en,
  spanish: sp,
  vietanmese: viet,
};

export const LanguageContextProvider: React.FC = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    console.log(RNLocalize.getLocales());
    const currentLanguage = RNLocalize.findBestAvailableLanguage(
      Object.keys(languageObj),
    );

    setSelectedLanguage(currentLanguage?.languageTag || 'en');
  }, []);

  const value = {
    ...languageObj[selectedLanguage],
  };
  return (
    <LanguageContext.Provider value={value}>
      <App />
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);

// export function LanguageProvider({ children }) {
//   const defaultLanguage = window.localStorage.getItem('rcml-lang');
//   const [userLanguage, setUserLanguage] = useState(defaultLanguage || 'en');

//   const provider = {
//     userLanguage,
//     dictionary: dictionaryList[userLanguage],
//     userLanguageChange: selected => {
//       const newLanguage = languageOptions[selected] ? selected : 'en';
//       setUserLanguage(newLanguage);
//       window.localStorage.setItem('rcml-lang', newLanguage);
//     },
//   };

//   return (
//     <LanguageContext.Provider value={provider}>
//       {children}
//     </LanguageContext.Provider>
//   );
// }
