import React, { useState } from 'react';
import Select from 'react-select';
import type { Option } from './textbox'


interface Pointsboxprop {
    maxPoints: number;
    selectedOption: Option | null | undefined;
    setSelectedOption: any;
}

const Pointsbox: React.FC<Pointsboxprop> = (props: Pointsboxprop) => {
  const options: Option[] = [];

  // add option objects to option list
  for (let i=1 ; i<props.maxPoints + 1 ; i++) {
    options.push({value: i, label: i.toString() + ' p'})
  }
  


  return (
      <div>
        <Select
          instanceId='long-value-select' //react select component needs an id 
          defaultValue={props.selectedOption}
          onChange={props.setSelectedOption}
          options={options}
          isClearable={true}
          isSearchable={false} 
        />
      </div>
  );
};

export default Pointsbox;

