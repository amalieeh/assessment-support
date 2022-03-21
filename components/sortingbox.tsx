import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Option {
  value: string;
  label: string;
}

const Sortingbox: React.FC<{}> = () => {
  const [sortingAlgorithm, setSortingAlgorithm] = React.useState('');

  const options: Option[] = [
    { value: 'random', label: 'Tilfeldige besvarelser' },
    { value: 'candidateNumber', label: 'Kandidatnummer' },
    { value: 'similarAnswers', label: 'Liknende besvarelser' },
    { value: 'divergentAnswers', label: 'Divergerende besvarelser' },
  ];

  const handleChange = (event: SelectChangeEvent) => {
    setSortingAlgorithm(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sortér etter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortingAlgorithm}
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
