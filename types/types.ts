export enum CaseStatus {
  SubmitForm = 'submitForm',
  SubmitDoc = 'submitDoc',
  SchedApt = 'schedApt',
}

export enum CaseType {
  Daca = 'daca',
  Citizenship = 'citizenship',
  CriminalRecord = 'criminalRecord',
}

export enum QuestionType {
  General = 'general',
  Daca = 'daca',
  Citizenship = 'citizenship',
}

export enum AnswerType {
  LField = 'lField',
  SField = 'sField',
  Dropdown = 'dropdown',
  Radio = 'radio',
  Calendar = 'calendar',
}

export type Client = {
  id: string;
  fullName: string;
  createdAt: Date;
  answers?: Map<string, Map<string, string>>;
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
