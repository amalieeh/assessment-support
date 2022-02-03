import React from 'react';
import Select from 'react-select';
import { Option } from './textbox'

interface Pointsboxprop {
    maxPoints: number;
    selectedOption: Option | null | undefined;
    setSelectedOption: any;
}

const Pointsbox: React.FC<Pointsboxprop> = (props: Pointsboxprop) => {
  const options: Option[] = [{value: 0, label: '0 p'}];

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
          placeholder="Sett poeng"
        />
      </div>
  );
};

export default Pointsbox;

