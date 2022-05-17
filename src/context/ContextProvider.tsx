import React, { useState, useContext } from 'react';
import { getEmptyClient } from 'utils/utils';
import { Client } from 'types/types';
import { dictionaryList } from 'multilingual/index';

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

// Lanuage Context //
// create the language context with default selected language
export const LanguageContext = React.createContext({
  userLanguage: 'EN',
  dictionary: dictionaryList.EN,
  userLanguageChange: lang => {},
});

// define the Context Provider, which provides the language context to app
export function LanguageProvider({ children }) {
  const [userLanguage, setUserLanguage] = useState('EN');

  const langProvider = {
    userLanguage,
    dictionary: dictionaryList[userLanguage],
    userLanguageChange: newLanguage => {
      setUserLanguage(newLanguage);
    },
  };

  return (
    <LanguageContext.Provider value={langProvider}>
      {children}
    </LanguageContext.Provider>
  );
}

// get text according to id & current language
export function Text(tid: any): string {
  const languageContext = useContext(LanguageContext);
  return languageContext.dictionary[tid];
}
