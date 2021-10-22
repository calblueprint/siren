enum CaseStatus {
  SubmitForm = 'submitForm',
  SubmitDoc = 'submitDoc',
  SchedApt = 'schedApt',
}

enum CaseType {
  Daca = 'daca',
  Citizenship = 'citizenship',
  CriminalRecord = 'criminalRecord',
}

enum QuestionType {
  General = 'general',
  Daca = 'daca',
  Citizenship = 'citizenship',
}

enum AnswerType {
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
  cases: Case[];
  answers: Map<string, Map<string, string>>;
};

export type Case = {
  id: string;
  status: CaseStatus;
  type: CaseType;
  documents: Document[];
};

export type Document = {
  id: string;
  url: string;
  type: string;
  createdAt: Date;
};

export type Question = {
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
