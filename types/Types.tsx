export interface AnswerType {
  assessmentId: string;
  answer: string;
  candidateId: number;
  maxPoints: number;
  taskNumber: number;
}

export interface AssessmentType extends AnswerType{
  score: number | string;
}

export interface ApprovalType extends AssessmentType{
  inconsistentScores?: number[];
}