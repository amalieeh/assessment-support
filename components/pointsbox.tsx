import React, { useState } from 'react';
import Select from 'react-select';
import styles from '../styles/pointsbox.module.css'

interface Option {
  value: number;
  label: string;
}

interface Pointsboxprop {
  maxPoints: number
}


const Pointsbox: React.FC<Pointsboxprop> = (props: Pointsboxprop) => {
  const options: Option[] = [];

  // add option objects to option list
  for (let i=1 ; i<props.maxPoints + 1 ; i++) {
    options.push({value: i, label: i.toString() + ' p'})
  }
  
  const [selectedOption, setSelectedOption] = useState<Option | null>();

  return (
    <div className="App">
      <div className={styles.container}>
      <Select
        instanceId='long-value-select' //react select component needs an id 
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        isClearable={true}
        isSearchable={false} 
      />
      </div>
    </div>
  );
}

export default Pointsbox;

