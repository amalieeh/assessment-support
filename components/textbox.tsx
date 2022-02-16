import * as React from 'react';
import styles from "../styles/Textbox.module.css";
import Pointsbox from "./pointsbox";
import {useState} from "react";
import {AssessmentType} from "../types/Types";




interface textboxprop {
    assessment: AssessmentType;
    setAssessment: (assessment: AssessmentType, newScore: number) => void;
}

const Textbox: React.FC<textboxprop> = (props: textboxprop) => {
    const {assessment, setAssessment} = props;
    return (
        <div className={styles.card}>
            <div className={styles.alignTitlePoints}>
                <Pointsbox
                    assessment={assessment}
                    setAssessment={setAssessment}
                />
            </div>
            {props.assessment.answer}
        </div>
    )
};

export default Textbox;
