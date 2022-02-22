export interface approvaltextboxprop {
  answerId: string;
  candidateId: string;
  answer: string;
  points: string;
}

export interface AssessmentType {
  assessmentId: string;
  answer: string;
  candidateId: number;
  taskNumber: number;
  maxPoints: number;
  score: number | null;
}

export interface AnswerType {
  assessmentId: string;
  answer: string;
  candidateId: number;
  maxPoints: number;
  taskNumber: number;
}