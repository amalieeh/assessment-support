import * as React from 'react';
import styles from '../styles/Textbox.module.css';
import { ApprovalType, AssessmentType } from '../types/Types';
import Paper from '@mui/material/Paper';
import parse from 'html-react-parser';
import Gradingbuttons from './gradingbuttons';
import { Button } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';

interface approvalTexboxProp {
  assessment: ApprovalType;
  setAssessmentScore: (
    assessment: AssessmentType,
    newScore: number | string
  ) => void;
  toggleFlag: (assessment: ApprovalType) => void;
}

const ApprovalTextbox: React.FC<approvalTexboxProp> = (
  props: approvalTexboxProp
) => {
  const grades = ['F', 'E', 'D', 'C', 'B', 'A']
  let inconsistentScoresString = '';
  if (props.assessment.inconsistentScores) {
    props.assessment.inconsistentScores.length == 2
      ? (inconsistentScoresString +=
          grades[Math.round((props.assessment.inconsistentScores[0] / props.assessment.maxPoints) * 5)] +
          ' og ' +
          grades[Math.round((props.assessment.inconsistentScores[1] / props.assessment.maxPoints) * 5)])
  : null;
  }
  // As of now it only supports 2 inconsistent assessments
  const showConflictError = inconsistentScoresString.length > 0;

  return (
    <div>
      {showConflictError ? (
        <div>
          Konflikt! Det er blitt satt karakterene: {inconsistentScoresString}
        </div>
      ) : null}
      <Paper
        sx={{
          p: 3,
          margin: 'auto',
          width: 800,
          border:
            showConflictError || typeof props.assessment.score == 'string'
              ? 3
              : null,
          borderColor: '#ce4d5f',
        }}
      >
        <div className={styles.approvalTextboxCard}>
          <div className={styles.approvalTextboxContent}>
            <strong>{props.assessment.candidateId}</strong>
            <div className={styles.approvalTextboxContent}>
              <Gradingbuttons
                assessment={props.assessment}
                score={props.assessment.score}
                setAssessmentScore={props.setAssessmentScore}
              />
              <Button
                style={{ marginLeft: 15 }}
                onClick={() => props.toggleFlag(props.assessment)}
              >
                {props.assessment.isFlagged ? (
                  <FlagIcon color="secondary" />
                ) : (
                  <FlagIcon color="primary" />
                )}
              </Button>
            </div>
          </div>
          <div>{parse(props.assessment.answer)}</div>
        </div>
      </Paper>
    </div>
  );
};

export default ApprovalTextbox;
