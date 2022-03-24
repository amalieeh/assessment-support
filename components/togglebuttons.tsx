import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { CgLayoutGrid } from 'react-icons/cg';
import { BiGridVertical } from 'react-icons/bi';
import { BsFillPauseFill } from 'react-icons/bs';

interface Togglebuttonsprops {
  value: number;
  handleSetMaxItems: (
    event: React.MouseEvent<HTMLElement>,
    value: string | null
  ) => void;
}

const Togglebuttons: React.FC<Togglebuttonsprops> = (
  props: Togglebuttonsprops
) => {
  return (
    <ToggleButtonGroup
      sx={{ display: 'block', maxWidth: '250px', marginRight: '4px' }}
      value={props.value.toString()}
      exclusive
      onChange={props.handleSetMaxItems}
    >
      <ToggleButton key="2" value="2" sx={{ padding: 1.8 }}>
        <BsFillPauseFill size={15} />
      </ToggleButton>
      <ToggleButton key="4" value="4">
        <CgLayoutGrid size={22} />
      </ToggleButton>
      <ToggleButton key="6" value="6">
        <BiGridVertical size={22} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default Togglebuttons;
