import * as React from "react";
import styles from "../styles/Textbox.module.css";
import Pointsbox from "./pointsbox";
import { AssessmentType } from "../types/Types";
import parse from "html-react-parser";

interface textboxprop {
  assessment: AssessmentType;
  setAssessment: (assessment: AssessmentType, newScore: number) => void;
}

const Textbox: React.FC<textboxprop> = (props: textboxprop) => {
  return (
    <div className={styles.card}>
      <div className={styles.alignItems}>
        Besvarelse fra kandidat: {props.assessment.candidateId}
        <Pointsbox
          assessment={props.assessment}
          setAssessment={props.setAssessment}
        />
      </div>
      <div className={styles.scrollable}>{parse(props.assessment.answer)}</div>
    </div>
  );
};

export default Textbox;
