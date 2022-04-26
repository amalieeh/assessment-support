import { NextPage } from 'next';
import styles from '../styles/Completion.module.css';
import data from '../data/IT2810Høst2018.json';
import Link from 'next/link';
import { Button, Snackbar } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import Grid from '@mui/material/Grid';
import * as React from 'react';
import Header from '../components/header';
import {
  ApprovalType,
  AssessmentType,
  candidateAndGradeType,
  candidateAndSumType,
} from '../types/Types';
import {
  convertToNumber,
  getSumMaxScoresAllTasks,
  isAllTasksAssessed,
  taskNums,
} from '../functions/helpFunctions';
import Card from '@material-ui/core/Card';

function convertToGrade(sum: number, total: number): string {
  const score: number = sum / total;
  if (score < 0) {
    return 'Invalid grade';
  } else if (score <= 0.4) {
    return 'F';
  } else if (score <= 0.52) {
    return 'E';
  } else if (score <= 0.64) {
    return 'D';
  } else if (score <= 0.76) {
    return 'C';
  } else if (score <= 0.88) {
    return 'B';
  } else if (score <= 1) {
    return 'A';
  } else {
    return 'Invalid grade';
  }
}

function getCandi(): candidateAndGradeType[] {
  if (typeof window == 'undefined' || !isAllTasksAssessed()) {
    return [];
  }

  let sums: candidateAndSumType[] = [];

  // set first elements in sums[]
  JSON.parse(
    localStorage.getItem(taskNums[0].toString() + '_approved') as string
  )
    .sort((a: ApprovalType, b: ApprovalType) => {
      return a.candidateId - b.candidateId;
    })
    .map((assessment: ApprovalType) => {
      sums.push({
        candidateId: assessment.candidateId,
        sum: convertToNumber(assessment.score),
      });
    });

  // add the rest of the scores in sums[]
  for (let i = 1; i < taskNums.length; i++) {
    let moreAssessments: AssessmentType[];
    moreAssessments = JSON.parse(
      localStorage.getItem(taskNums[i].toString() + '_approved') as string
    );
    moreAssessments.map((assessment: ApprovalType) => {
      const id = sums.findIndex((e) => e.candidateId == assessment.candidateId);
      sums[id].sum += convertToNumber(assessment.score);
    });
  }

  // calculate grades
  const sumAllTasks: number = getSumMaxScoresAllTasks(taskNums);
  const listOfCandidatesAndGrades: candidateAndGradeType[] = sums.map((e) => {
    const givenGrade = convertToGrade(e.sum, sumAllTasks);
    return { candidateId: e.candidateId, grade: givenGrade };
  });
  return listOfCandidatesAndGrades;
}

const Completion: NextPage = () => {
  const listOfCandidatesAndGrades = getCandi();
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <div className={styles.container}>
      <Header
        data={data}
        description="Godkjenn alle karakterer"
        goBackPage="task"
      />
      <main className={styles.main}>
        <div className={styles.listOfCards}>
          {listOfCandidatesAndGrades.map(
            (candidateAndGrade: candidateAndGradeType) => (
              <Link
                key={candidateAndGrade.candidateId}
                href={{
                  pathname: '/candidate',
                  query: { id: candidateAndGrade.candidateId.toString() },
                }}
                passHref
              >
                <Card className={styles.gradeCard}>
                  <div>
                  Kandidat <strong>{candidateAndGrade.candidateId}</strong></div>
                  <span>{candidateAndGrade.grade}</span>
                </Card>
              </Link>
            )
          )}
        </div>
        <div style={{ padding: 20 }}>
            <Button onClick={() => setOpen(true)} style={{ marginLeft: 10 }} variant="contained">
              Eksporter karakterer
            </Button>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
            message="PDF lastet ned"
          />
          <Link href={'/'} passHref>
          <Button style={{ marginLeft: 10 }} variant="contained">
            Avslutt
          </Button></Link>
        </div>
      </main>
    </div>
  );
};

export default Completion;
