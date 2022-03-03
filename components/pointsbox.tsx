import React from "react";
import { AssessmentType } from "../types/Types";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

interface Option {
  value: number;
  label: string;
}

interface Pointsboxprop {
  assessment: AssessmentType;
  setAssessment: (assessment: AssessmentType, newScore: number) => void;
}

const Pointsbox: React.FC<Pointsboxprop> = (props: Pointsboxprop) => {
  const [open, setOpen] = React.useState(false);

  const options: Option[] = [{ value: 0, label: "0 p" }];
  for (let i = 1; i < props.assessment.maxPoints + 1; i++) {
    // add option objects to option list
    options.push({ value: i, label: i.toString() + " p" });
  }

  const handleChange = (selectedOption: any) => {
    props.setAssessment(props.assessment, selectedOption.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box>
      <FormControl sx={{ minWidth: 110 }} size="small">
        <InputLabel id="demo-simple-select-label" sx={{ fontSize: 13.5 }}>
          Sett poeng
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={props.assessment.score}
          label="Sett poeng"
          onChange={handleChange}
          sx={{ fontSize: 13.5 }}
        >
          <MenuItem value="" sx={{ fontSize: 13.5 }}>
            <em>Sett poeng</em>
          </MenuItem>
          {options.map((option: Option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{ fontSize: 13.5 }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Pointsbox;
