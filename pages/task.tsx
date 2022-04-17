import { NextPage } from 'next';
import mainStyles from '../styles/Main.module.css';
import styles from '../styles/Task.module.css';
import data from '../data/IT2810Høst2018.json';
import Header from '../components/header';
import { Button } from '@mui/material';
import Link from 'next/link';
import { getAssessments, getTaskTitle, noRemainingAnswers } from '../functions/helpFunctions';
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
      <main className={styles.grid}>
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
                    sx={{ height: 56, fontSize: 15, margin: 1 }}
                  >
                    {taskNum + 1}: {getTaskTitle(taskNum +1)}
                  </Button>
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
                  key={taskNum + 1}
                  href={{
                    pathname: '/approval',
                    query: { task: taskNum + 1 },
                  }}
                  passHref
                >
                  <Button
                    color="warning"
                    key={taskNum + 1}
                    variant="contained"
                    sx={{ height: 56, fontSize: 15, margin: 1 }}
                  >
                    {taskNum + 1}: {getTaskTitle(taskNum +1)}
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
                    sx={{ height: 56, fontSize: 15, margin: 1 }}
                  >
                    {taskNum + 1}: {getTaskTitle(taskNum +1)}
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
                    sx={{ height: 56, fontSize: 15, margin: 1 }}
                  >
                    {taskNum + 1}: {getTaskTitle(taskNum +1)}
                  </Button>
                </Link>
              );
            }
          })}
      </main>
    </div>
  );
};

export default Task;
