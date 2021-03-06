export enum CaseStatus {
  SubmitForm = 'submitForm',
  SubmitDoc = 'submitDoc',
  InReview = 'inReview',
  SchedApt = 'schedApt',
  AttenApt = 'attenApt',
  Resubmit = 'resubmit',
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
  email: string;
  fullName: string;
  createdAt: Date;
  answers: Map<string, Map<string, any>>;
  language: string;
};

export type Case = {
  id: string;
  status: CaseStatus;
  type: string;
  identifier: string;
};

export type CalendlyLink = {
  type: string;
  link: string;
};

export type Document = {
  id: string;
  url: string;
  type: string;
  createdAt: Date;
};

export type Question = {
  id: string;
  displayText: Map<string, string>; // string;
  description: Map<string, string>; // string;
  example: Map<string, string>; // string;
  questionType: QuestionType;
  key: string;
  order: number;
  active: boolean;
  answerType: AnswerType;
  answerOptions?: Map<string, string[]>; // string[];
};

export type QuestionComponentProps = {
  question: Question;
  setAnswer: (question: Question, input: any) => void;
  existingAnswer?: any;
};

export type QuestionManagerProps = {
  setNextScreen: (...args: string[]) => void;
  setPreviousScreen?: (...args: string[]) => void;
  existingAnswers: Map<string, Map<string, any>>;
  managerSpecificProps?: Dictionary; // add any specific extra props you need in here
  goBack?: any;
  isUpdating?: boolean;
};

export type Dictionary = {
  [key: string]: any;
};

export type Appointment = {
  id: string;
  caseType: string;
  client: string; // is this needed?
  clientEmail: string;
  startTime: Date;
};

export type DocumentType = {
  caseType: string;
  driveLic: string;
  greenCard: string;
  poReport: string;
  // remaining types
};

export type MultilingualQuestion = {
  EN: string;
  ES: string;
  VIET: string;
};
