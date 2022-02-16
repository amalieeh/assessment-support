import * as React from "react";
import { approvaltextboxprop } from "../types/Types";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const ApprovalTextbox: React.FC<approvaltextboxprop> = (
  props: approvaltextboxprop
) => {
  return (
    <Paper sx={{ p: 3, margin: "auto", width: 800 }}>
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant="subtitle1" component="div">
            {props.candidateId}
          </Typography>
        </Grid>
        <Grid item xs={12} sm container sx={{ mt: 0.5 }}>
          <Typography variant="body2" gutterBottom>
            {props.answer}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" component="div">
            {props.points}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ApprovalTextbox;
