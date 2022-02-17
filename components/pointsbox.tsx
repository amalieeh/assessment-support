import React from "react";
import Select from "react-select";
import { AssessmentType } from "../types/Types";

interface Option {
  value: number;
  label: string;
}

interface Pointsboxprop {
  assessment: AssessmentType;
  setAssessment: (assessment: AssessmentType, newScore: number) => void;
}

const Pointsbox: React.FC<Pointsboxprop> = (props: Pointsboxprop) => {
  const options: Option[] = [{ value: 0, label: "0 p" }];

  // add option objects to option list
  for (let i = 1; i < props.assessment.maxPoints + 1; i++) {
    options.push({ value: i, label: i.toString() + " p" });
  }

  const handleChange = (selectedOption: Option) => {
    props.setAssessment(props.assessment, selectedOption.value);
  };

  return (
    <div>
      <Select
        instanceId="long-value-select"
        defaultValue={props.assessment.score}
        onChange={handleChange}
        options={options}
        isClearable={true}
        isSearchable={false}
        placeholder="Sett poeng"
      />
    </div>
  );
};

export default Pointsbox;
