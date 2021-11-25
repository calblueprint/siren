export enum CaseStatus {
  SubmitForm = 'submitForm',
  SubmitDoc = 'submitDoc',
  SchedApt = 'schedApt',
}

export enum CaseType {
  DacaRenewal = 'dacaRenewal',
  Citizenship = 'citizenship',
  CriminalRecord = 'criminalRecord',
}

export enum QuestionType {
  General = 'general',
  Daca = 'daca',
  Citizenship = 'citizenship',
}

export enum AnswerType {
  LargeInput = 'largeInput',
  SmallInput = 'smallInput',
  Dropdown = 'dropdown',
  Calendar = 'calendar',
  Radio = 'radio',
}

export type Client = {
  id: string;
  fullName: string;
  createdAt: Date;
  answers: Map<string, Map<string, any>>;
};

export type Case = {
  id: string;
  status: CaseStatus;
  type: CaseType;
};

export type Document = {
  id: string;
  url: string;
  type: string;
  createdAt: Date;
};

export type Question = {
  id: string;
  displayText: string;
  description: string;
  example: string;
  questionType: QuestionType;
  key: string;
  order: number;
  active: boolean;
  answerType: AnswerType;
  answerOptions?: string[];
};

export type QuestionComponentProps = {
  question: Question;
  setAnswer: (question: Question, input: any) => void;
  existingAnswer?: any;
};

export type QuestionManagerProps = {
  setNextScreen: (...args: string[]) => void;
  existingAnswers: Map<string, Map<string, any>>;
  managerSpecificProps?: Dictionary; // add any specific extra props you need in here
};

export type Dictionary = {
  [key: string]: any;
};
