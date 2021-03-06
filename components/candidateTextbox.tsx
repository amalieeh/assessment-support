import * as React from 'react';
import { ApprovalType, AssessmentType } from '../types/Types';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import parse from 'html-react-parser';
import Pointsbox from "./pointsbox";

interface approvalTexboxProp {
  assessment: ApprovalType;
  setAssessmentScore: (assessment: AssessmentType, newScore: number) => void;
}

const CandidateTextbox: React.FC<approvalTexboxProp> = (
  props: approvalTexboxProp
) => {
  let inconsistentScoresString = '';
  if (props.assessment.inconsistentScores) {
    props.assessment.inconsistentScores.length == 2
      ? (inconsistentScoresString +=
        props.assessment.inconsistentScores[0].toString() +
        ' og ' +
        props.assessment.inconsistentScores[1].toString())
      : null;
  }
  // As of now it only supports 2 inconsistent assessments

  return (
    <div>
      <Paper
        sx={{
          p: 3,
          margin: 'auto',
          width: 800,
          border: typeof props.assessment.score !== "number" ? 3 : null,
          borderColor: '#ce4d5f',
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <strong>Oppgave {props.assessment.taskNumber}</strong>
            <Pointsbox
              assessment={props.assessment}
              setAssessmentScore={props.setAssessmentScore}
              topMargin={"1em"}
            />
          </Grid>
          <Grid item xs={12} sm container sx={{ mt: -2 }}>
            <div>{parse(props.assessment.answer)}</div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default CandidateTextbox;
