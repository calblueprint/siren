import React, { useContext, useState } from 'react';
import { getEmptyClient } from 'utils/utils';
import { Client, Dictionary } from 'types/types';
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

// general function for creating a context
const createLanguageContext = <A extends {} | null>(defaultValue: A) => {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    langState: defaultValue,
    langUpdate: defaultUpdate,
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [langState, langUpdate] = React.useState(defaultValue);
    return <ctx.Provider value={{ langState, langUpdate }} {...props} />;
  }
  return [ctx, Provider] as const; // alternatively, [typeof ctx, typeof Provider]
};

// create a context for the language
const [langContext, langProvider] = createLanguageContext<Dictionary>(
  dictionaryList.EN,
);
export const LanguageProvider = langProvider; // used in App.tsx
export const LanguageContext = langContext; // used by client context consumers

// // Lanuage Context //
// // create the language context with default selected language
// export const LanguageContext = React.createContext({
//   userLanguage: 'EN',
//   dictionary: dictionaryList.EN,
//   userLanguageChange: lang => {},
// });

// // define the Context Provider, which provides the language context to app
// export function LanguageProvider({ children }) {
//   const [userLanguage, setUserLanguage] = useState('EN');

//   const langProvider = {
//     userLanguage,
//     dictionary: dictionaryList[userLanguage],
//     userLanguageChange: (newLanguage: React.SetStateAction<string>) => {
//       setUserLanguage(newLanguage);
//     },
//   };

//   return (
//     <LanguageContext.Provider value={langProvider}>
//       {children}
//     </LanguageContext.Provider>
//   );
// }

// // get text according to id & current language
// export function Text(tid: any): string {
//   const languageContext = useContext(LanguageContext);
//   // return languageContext.dictionary[tid];
//   const lang = languageContext.state;
//   return dictionaryList.($(lang))[tid];
// }

// I18n //
const I18n = ({ str }) => {
  const dict = useContext(LanguageContext).langState;
  const translated = dict && dict[str] ? dict[str] : str;
  return translated;
};

export const Text = str => <I18n str={str} />;
