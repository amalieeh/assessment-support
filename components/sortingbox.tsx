import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AnswerType } from '../types/Types';

interface Option {
  value: string;
  label: string;
}

interface Sortingboxprops {
  answers: AnswerType[];
  sortingAlgorithm: string;
  setSortingAlgorithm: (algortihm: string) => void;
}

const Sortingbox: React.FC<Sortingboxprops> = (props: Sortingboxprops) => {
  const options: Option[] = [
    { value: 'random', label: 'Tilfeldige besvarelser' },
    { value: 'candidate', label: 'Kandidatnummer' },
    // { value: 'similarAnswers', label: 'Liknende besvarelser' },
    // { value: 'divergentAnswers', label: 'Divergerende besvarelser' },
    { value: 'length_hl', label: 'Lengde fra lengst til kortest' },
    { value: 'length_lh', label: 'Lenge fra kortest til lengst' },
  ];

  const handleChange = (event: SelectChangeEvent) => {
    props.setSortingAlgorithm(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 250, display: 'block' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sortér etter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.sortingAlgorithm}
          label="Sortér etter"
          onChange={handleChange}
        >
          {options.map((option: Option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Sortingbox;
