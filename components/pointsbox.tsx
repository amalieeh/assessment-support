import React, { useState } from 'react';
import Select from 'react-select';
import styles from '../styles/pointsbox.module.css'

interface Option {
  value: number;
  label: string;
}

//maxPoints: number

const Pointsbox = () => {

  // const start = 1

  // function range(start, end) {
  //   return Array(end - start + 1).fill().map((_, idx) => start + idx)
  // }

  const options: Option[] = [
    { value: 1, label: '1 p' },
    { value: 2, label: '2 p' },
    { value: 3, label: '3 p' },
  ];
  
  const [selectedOption, setSelectedOption] = useState<Option | null>();
  console.log(selectedOption);

  return (
    <div className="App">
      <div className={styles.container}>
      <Select
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

