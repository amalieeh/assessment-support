import { NextPage } from 'next';
import mainStyles from '../styles/Main.module.css';
import data from '../data/IT2810Høst2018.json';
import Header from '../components/header';
import TaskTable from '../components/taskTable';
import { Button, Grid } from '@mui/material';
import Link from 'next/link';
import { getAssessments } from '../functions/helpFunctions';
import { useEffect, useState } from 'react';

const Task: NextPage = () => {
  const totalTasks: number =
    data.ext_inspera_candidates[0].result.ext_inspera_questions.length;
  const taskNumbers: number[] = Array.from(Array(totalTasks).keys());

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
        <TaskTable taskNumbers={taskNumbers}></TaskTable>
        <div style={{ maxWidth: 1230 }}>
          {taskNumbers.map((taskNum: number) => {
            if (
              approvedAssessments != undefined &&
              approvedAssessments.includes(taskNum)
            ) {
              return (
                <Link
                  key={taskNum + 1}
                  href={{
                    pathname: '/approval',
                    query: { task: taskNum + 1 },
                  }}
                  passHref
                >
                  <Button
                    color="success"
                    key={taskNum + 1}
                    variant="contained"
                    sx={{
                      width: 73,
                      height: 73,
                      fontSize: 25,
                      margin: '25px',
                    }}
                  >
                    {taskNum + 1}
                  </Button>
                </Link>
              );
            } else if (
              startedAssessments != undefined &&
              startedAssessments.includes(taskNum)
            ) {
              return (
                <Link
                  key={taskNum + 1}
                  href={{
                    pathname: '/assessment',
                    query: { task: taskNum + 1 },
                  }}
                  passHref
                >
                  <Button
                    color="warning"
                    key={taskNum + 1}
                    variant="contained"
                    sx={{
                      width: 73,
                      height: 73,
                      fontSize: 25,
                      margin: '25px',
                    }}
                  >
                    {taskNum + 1}
                  </Button>
                </Link>
              );
            } else {
              return (
                <Link
                  key={taskNum + 1}
                  href={{
                    pathname: '/assessment',
                    query: { task: taskNum + 1 },
                  }}
                  passHref
                >
                  <Button
                    key={taskNum + 1}
                    variant="contained"
                    sx={{
                      width: 73,
                      height: 73,
                      fontSize: 25,
                      margin: '25px',
                    }}
                  >
                    {taskNum + 1}
                  </Button>
                </Link>
              );
            }
          })}
        </div>
      </main>
    </div>
  );
};

export default Task;
