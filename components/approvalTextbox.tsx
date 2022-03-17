import * as React from "react";
import {Approvaltextboxprop} from "../types/Types";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";

const ApprovalTextbox: React.FC<Approvaltextboxprop> = (
  assessment: Approvaltextboxprop,
) => {

  let inconsistentScoresString = "";
  if (assessment.inconsistentScores) {
    assessment.inconsistentScores.length == 2 ?
      inconsistentScoresString += assessment.inconsistentScores[0].toString() + " og " + assessment.inconsistentScores[1].toString()
      : null;
  }
  // As of now it only supports 2 inconsistent assessments
  const showConflictError = inconsistentScoresString.length > 0;

  return (
    <div>
      {showConflictError ?
        <Typography variant="body1">Konflikt! Det er blitt satt
          scorene: {inconsistentScoresString} </Typography> : null}
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
            <Typography variant="subtitle1">
              {assessment.candidateId}
            </Typography>
            <Typography variant="subtitle1" align="left">
              {assessment.score} p
            </Typography>
          </Grid>
          <Grid item xs={12} sm container sx={{mt: 0.5}}>
            <Typography variant="body2" gutterBottom>
              {parse(assessment.answer)}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ApprovalTextbox;
