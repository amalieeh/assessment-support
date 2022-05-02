import { NextPage } from 'next';
import mainStyles from '../styles/Main.module.css';
import data from '../data/IT2810Høst2019.json';
import Header from '../components/header';
import { Button, ListItemText, Paper } from '@mui/material';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import Link from 'next/link';
import {
  getAssessments,
  noRemainingAnswers,
  getTaskTitle,
  isAllTasksAssessed,
} from '../functions/helpFunctions';
import { useEffect, useState } from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import * as React from 'react';

const Task: NextPage = () => {
  const totalTasks: number =
    data.ext_inspera_candidates[0].result.ext_inspera_questions.length;
  const taskNumbers: number[] = Array.from(Array(totalTasks).keys()).map(
    (i) => i + 1
  );

  const [approvedAssessments, setApprovedAssessments] = useState<number[]>();
  const [startedAssessments, setStartedAssessments] = useState<number[]>();

  useEffect(() => {
    const assessments = getAssessments(taskNumbers);
    const approvedAss = assessments[0];
    const startedAss = assessments[1];
    setApprovedAssessments(approvedAss);
    setStartedAssessments(startedAss);
  }, []);

  return (
    <div className={mainStyles.container}>
      <Header
        data={data}
        description={'Oversikt over alle oppgavene'}
        goBackPage=""
      />
      <main style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <Paper sx={{ margin: '25px', marginLeft: '80px' }}>
            <MenuList>
          {taskNumbers.map((taskNum: number) => {
            if (
              approvedAssessments != undefined &&
              approvedAssessments.includes(taskNum)
            ) {
              return (
                <Link
                  key={taskNum}
                  href={{
                    pathname: '/approval',
                    query: { task: taskNum },
                  }}
                  passHref
                >
                      <MenuItem>
                        <ListItemIcon>
                          <CheckCircleOutlineOutlinedIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{fontSize: '24px'}}>
                          Oppgave {taskNum}: {getTaskTitle(taskNum)}
                        </ListItemText>
                      </MenuItem>
                </Link>
              );
            } else if (
              noRemainingAnswers(taskNum) &&
              !approvedAssessments?.includes(taskNum) &&
              startedAssessments != undefined &&
              startedAssessments.includes(taskNum)
            ) {
              return (
                <Link
                  key={taskNum}
                  href={{
                    pathname: '/approval',
                    query: { task: taskNum },
                  }}
                  passHref
                >
                      <MenuItem>
                        <ListItemIcon>
                          <AdjustOutlinedIcon color="warning" />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{fontSize: '24px'}}>
                          Oppgave {taskNum}: {getTaskTitle(taskNum)}
                        </ListItemText>
                      </MenuItem>
                </Link>
              );
            } else if (
              startedAssessments != undefined &&
              startedAssessments.includes(taskNum)
            ) {
              return (
                <Link
                  key={taskNum}
                  href={{
                    pathname: '/assessment',
                    query: { task: taskNum },
                  }}
                  passHref
                >
                      <MenuItem>
                        <ListItemIcon>
                          <AdjustOutlinedIcon color="warning" />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{fontSize: '24px'}}>
                          Oppgave {taskNum}: {getTaskTitle(taskNum)}
                        </ListItemText>
                      </MenuItem>
                </Link>
              );
            } else {
              return (
                <Link
                  key={taskNum}
                  href={{
                    pathname: '/assessment',
                    query: { task: taskNum },
                  }}
                  passHref
                >
                      <MenuItem>
                        <ListItemIcon>
                          <CircleOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{fontSize: '24px'}}>
                          Oppgave {taskNum}: {getTaskTitle(taskNum)}
                        </ListItemText>
                      </MenuItem>
                </Link>
              );
            }
          })}
            </MenuList>
          </Paper>
        </div>
      </main>
      {isAllTasksAssessed() ? (
        <Link href={'/completion'} passHref>
          <Button sx={{ textTransform: 'none', margin: 8 }} variant="contained">
            Se karakterer og resultater
          </Button>
        </Link>
      ) : (
        <Button
          disabled
          sx={{ textTransform: 'none', margin: 8 }}
          variant="contained"
        >
          Se karakterer og resultater
        </Button>
      )}
    </div>
  );
};

export default Task;
