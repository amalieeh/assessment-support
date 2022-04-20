import * as React from 'react';
import styles from '../styles/Textbox.module.css';
import Pointsbox from './pointsbox';
import { ApprovalType, AssessmentType } from '../types/Types';
import parse from 'html-react-parser';
import { Button } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import Gradingbuttons from './gradingbuttons';

interface textboxprop {
  assessment: AssessmentType;
  setAssessmentScore: (
    assessment: AssessmentType | ApprovalType,
    newScore: string | number
  ) => void;
  toggleFlag: (assessment: AssessmentType) => void;
}

const Textbox: React.FC<textboxprop> = (props: textboxprop) => {
  return (
    <div className={styles.card}>
      <div className={styles.alignItems}>
        Besvarelse fra kandidat: {props.assessment.candidateId}
        <div className={styles.pointboxAndFlag}>
          <Gradingbuttons
            assessment={props.assessment}
            score={props.assessment.score}
            setAssessmentScore={props.setAssessmentScore}
          />
          <Button onClick={() => props.toggleFlag(props.assessment)}>
            {props.assessment.isFlagged ? (
              <FlagIcon color="secondary" />
            ) : (
              <FlagIcon color="primary" />
            )}
          </Button>
        </div>
      </div>
      <div className={styles.scrollable}>{parse(props.assessment.answer)}</div>
    </div>
  );
};

export default Textbox;
