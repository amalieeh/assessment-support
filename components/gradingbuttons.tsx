import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ApprovalType, AssessmentType } from '../types/Types';

interface Gradingbuttonprops {
  score: string | number;
  assessment: AssessmentType | ApprovalType;
  setAssessmentScore: (
    assessment: AssessmentType | ApprovalType,
    newScore: string | number
  ) => void;
}

const Gradingbuttons: React.FC<Gradingbuttonprops> = (
  props: Gradingbuttonprops
) => {
  const gradeScores = ['0', '1', '2', '3', '4', '5'];
  const gradeLabels = ['F', 'E', 'D', 'C', 'B', 'A'];

  // for later calculation
  const maxPoints = props.assessment.maxPoints;

  const handleChange = (selectedOption: any) => {
    props.setAssessmentScore(props.assessment, selectedOption.target.value);
  };

  return (
    <ToggleButtonGroup
      value={props.assessment.score}
      exclusive
      onChange={handleChange}
    >
      {gradeScores.map((score: string, i: number) => (
        <ToggleButton key={gradeLabels[i]} value={score}>
          {gradeLabels[i]}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default Gradingbuttons;
