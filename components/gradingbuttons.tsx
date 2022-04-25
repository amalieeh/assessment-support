import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ApprovalType, AssessmentType, candidateAndGradeAssessmentType } from '../types/Types';
import { gradeLabels } from '../functions/helpFunctions';

interface Gradingbuttonprops {
  score: string | number;
  assessment: AssessmentType | ApprovalType | candidateAndGradeAssessmentType;
  setAssessmentScore: (
    assessment: AssessmentType | ApprovalType | candidateAndGradeAssessmentType,
    newScore: string | number
  ) => void;
}

const Gradingbuttons: React.FC<Gradingbuttonprops> = (
  props: Gradingbuttonprops
) => {

  const handleChange = (selectedOption: any) => {
    props.setAssessmentScore(props.assessment, selectedOption.target.value/5)
  };
  const value = typeof props.assessment.score == 'number' ? (props.assessment.score/props.assessment.maxPoints) * 5 : '';

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
    >
      {gradeLabels.map((label: string, i: number) => (
        <ToggleButton key={label} value={i}>
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default Gradingbuttons;
