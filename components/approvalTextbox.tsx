import * as React from "react";
import {ApprovalType} from "../types/Types";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";

interface approvalTexboxProp {
  assessment: ApprovalType
}

const ApprovalTextbox: React.FC<approvalTexboxProp> = (
  props: approvalTexboxProp,
) => {

  let inconsistentScoresString = "";
  if (props.assessment.inconsistentScores) {
    props.assessment.inconsistentScores.length == 2 ?
      inconsistentScoresString += props.assessment.inconsistentScores[0].toString() + " og " + props.assessment.inconsistentScores[1].toString()
      : null;
  }
  // As of now it only supports 2 inconsistent assessments
  const showConflictError = inconsistentScoresString.length > 0;

  return (
    <div>
      {showConflictError ?
        <Typography variant="body1">Konflikt! Det er blitt satt
          scorene: {inconsistentScoresString}
        </Typography>
        : null}
      <Paper
        sx={{
          p: 3,
          margin: "auto",
          width: 800,
          border: showConflictError ? 3 : null,
          borderColor: "#ce4d5f"
        }}>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              {props.assessment.candidateId}
            </Typography>
            <Typography variant="subtitle1" align="left" component="div">
              {props.assessment.score} p
            </Typography>
          </Grid>
          <Grid item xs={12} sm container sx={{mt: 0.5}}>
            <Typography variant="body2" gutterBottom component="div">
              {parse(props.assessment.answer)}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ApprovalTextbox;
