export interface AnswerType {
  assessmentId: string;
  answer: string;
  candidateId: number;
  maxPoints: number;
  taskNumber: number;
}

export interface AssessmentType extends AnswerType{
  score: number | string;
  isFlagged: boolean;
}

export interface ApprovalType extends AssessmentType{
  inconsistentScores?: number[];
}

export interface candidateAndGradeType {
  candidateId: number;
  grade: string;
}

export interface candidateAndGradeAssessmentType {
  candidateId: number;
  score: number;
  maxPoints: number;
}

export interface candidateAndSumType {
  candidateId: number;
  sum: number;
}
