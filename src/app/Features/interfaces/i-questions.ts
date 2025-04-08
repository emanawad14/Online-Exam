

export interface IQuestions {
  answers: Answer[];
  type: string;

  _id: string;
  question: string;
  correct: string;
  subject: Subject;
  exam: Exam;
  createdAt: string;
}

interface Exam {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
}

interface Subject {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
}

interface Answer {
  answer: string;
  key: string;
}