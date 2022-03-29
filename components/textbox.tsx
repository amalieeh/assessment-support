import * as React from "react";
import styles from "../styles/Textbox.module.css";
import Pointsbox from "./pointsbox";
import { AssessmentType } from "../types/Types";
import parse from "html-react-parser";
import { Button } from "@mui/material";
import FlagIcon from '@mui/icons-material/Flag';

interface textboxprop {
  assessment: AssessmentType;
  setAssessmentScore: (assessment: AssessmentType, newScore: number) => void;
  toggleFlag: (assessment: AssessmentType) => void;
}

const Textbox: React.FC<textboxprop> = (props: textboxprop) => {
  return (
    <div className={styles.card}>
      <div className={styles.alignItems}>
        Besvarelse fra kandidat: {props.assessment.candidateId}
        <div className={styles.pointboxAndFlag}>
          <Pointsbox
            assessment={props.assessment}
            setAssessment={props.setAssessmentScore}
          />
          <Button onClick={() => props.toggleFlag(props.assessment)}>
            {props.assessment.isFlagged ?
              <FlagIcon color="secondary"/> : <FlagIcon color="primary"/>
            }
          </Button>
        </div>
      </div>
      <div className={styles.scrollable}>{parse(props.assessment.answer)}</div>
    </div>
  );
};

export default Textbox;
