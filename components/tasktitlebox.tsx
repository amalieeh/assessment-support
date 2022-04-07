import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import data from '../data/IT2810Høst2018.json';
import Link from 'next/link';

interface Tasktitleboxprops {
  taskNumbers: number[];
}

const Tasktitlebox: React.FC<Tasktitleboxprops> = (
  props: Tasktitleboxprops
) => {
  return (
    <Paper sx={{ margin: '25px', marginLeft: '80px' }}>
      <MenuList>
        {props.taskNumbers.map((taskNum: number) => (
          <MenuItem>
            <ListItemIcon>{taskNum + 1}</ListItemIcon>
            <Link
              key={taskNum + 1}
              href={{
                pathname: '/assessment',
                query: { task: taskNum + 1 },
              }}
              passHref
            >
              {
                data.ext_inspera_candidates[0].result.ext_inspera_questions[
                  taskNum
                ].ext_inspera_questionTitle
              }
            </Link>
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
};

export default Tasktitlebox;
