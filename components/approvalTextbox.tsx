import * as React from "react";
import { AssessmentType } from "../types/Types";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";

const ApprovalTextbox: React.FC<AssessmentType> = (
  assessment: AssessmentType
) => {
  return (
    <Paper sx={{ p: 3, margin: "auto", width: 800 }}>
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant="subtitle1" component="div">
            {assessment.candidateId}
          </Typography>
        </Grid>
        <Grid item xs={12} sm container sx={{ mt: 0.5 }}>
          <Typography variant="body2" gutterBottom>
            {parse(assessment.answer)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="subtitle1"
            align="center"
            component="div"
            sx={{ width: 40 }}
          >
            {assessment.score} p
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ApprovalTextbox;
