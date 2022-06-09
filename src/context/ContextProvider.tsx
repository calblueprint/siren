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
  const langctx = React.createContext({
    langState: defaultValue,
    langUpdate: defaultUpdate,
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [langState, langUpdate] = React.useState(defaultValue);
    return <langctx.Provider value={{ langState, langUpdate }} {...props} />;
  }
  return [langctx, Provider] as const; // alternatively, [typeof ctx, typeof Provider]
};

// create a context for the language
const [langContext, langProvider] = createLanguageContext<Dictionary>(
  dictionaryList.EN,
);
export const LanguageProvider = langProvider; // used in App.tsx
export const LanguageContext = langContext; // used by client context consumers

// I18n indexes a langauge dictionary and returns translated version of current text
const I18n = ({ str }) => {
  const dict = useContext(LanguageContext).langState;
  const translated = dict && dict[str] ? dict[str] : str;
  return translated;
};

// wrapper function for I18n
export const Text = (str: string) => <I18n str={str} />;
