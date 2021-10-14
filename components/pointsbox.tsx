import React, { useState } from 'react';
import Select from 'react-select';

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: '1p', label: '1p' },
  { value: '2p', label: '2p' },
  { value: '3p', label: '3p' },
];

const Pointsbox = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>();
  console.log(selectedOption);

  return (
    <div className="App">
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  );
}

export default Pointsbox;

