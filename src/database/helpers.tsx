import { dictionaryList } from 'multilingual';
import { TextStr } from 'context/ContextProvider';

export const objectToMap = (obj: Object): Map<any, any> => {
  return new Map(
    Array.from(Object.entries(obj), ([k, v]) =>
      v instanceof Object ? [k, objectToMap(v)] : [k, v],
    ),
  );
};

export const objectToAnswerOptionsMap = (obj: Object): Map<any, any> => {
  return new Map(
    Array.from(Object.entries(obj), ([k, v]) => [k, v as Array<String>]),
  );
};

export const mapToObject = (map: Map<any, any>): Object => {
  return Object.fromEntries(
    Array.from(map.entries(), ([k, v]) =>
      v instanceof Map ? [k, mapToObject(v)] : [k, v],
    ),
  );
};

export const firestoreAutoId = (): string => {
  const CHARS =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let autoId = '';

  for (let i = 0; i < 20; i += 1) {
    autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return autoId;
};

export const updateLanguage = (
  val: string,
  dictUpdate: any, // local json
  stringUpdate: any, // firebase user language field
) => {
  if (val === 'Español') {
    dictUpdate(dictionaryList.ES); // dictionary type
    stringUpdate('ES');
  }
  if (val === 'Tiếng Việt') {
    dictUpdate(dictionaryList.VIET);
    stringUpdate('VIET');
  }
  if (val === 'English') {
    dictUpdate(dictionaryList.EN);
    stringUpdate('EN');
  }
};

// alert that handles translation
export function alertTextStr(str: string, langStr: string): void {
  alert(TextStr(str, langStr));
}
