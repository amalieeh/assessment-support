import { NextPage } from 'next';
import styles from '../styles/Completion.module.css';
import data from '../data/IT2810Høst2018.json';
import Link from 'next/link';
import { Button } from '@mui/material';
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
  if (typeof window == 'undefined') {
    return [];
  }
  /*
  // Check that all answers have been assessed
  for (let i = 1; i <= 16; i++ ) {
    if (!(i.toString() + '_approved' in localStorage)) {
      return [];
    }
  }
   */

  // for testing purposes. Will be changed to a getTaskNumbers()
  const taskNumbers = [3, 4, 7, 12, 15];
  let sums: candidateAndSumType[] = [];

  // set first elements in sums[]
  JSON.parse(
    localStorage.getItem(taskNumbers[0].toString() + '_approved') as string
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
  for (let i = 1; i < taskNumbers.length; i++) {
    let moreAssessments: AssessmentType[];
    moreAssessments = JSON.parse(
      localStorage.getItem(taskNumbers[i].toString() + '_approved') as string
    );
    moreAssessments.map((assessment: ApprovalType) => {
      const id = sums.findIndex((e) => e.candidateId == assessment.candidateId);
      sums[id].sum += convertToNumber(assessment.score);
    });
  }

  const sumAllTasks: number = getSumMaxScoresAllTasks(taskNumbers);
  const listOfCandidatesAndGrades: candidateAndGradeType[] = sums.map((e) => {
    const givenGrade = convertToGrade(e.sum, sumAllTasks);
    return { candidateId: e.candidateId, grade: givenGrade };
  });
  return listOfCandidatesAndGrades;
}

const Completion: NextPage = () => {
  const listOfCandidatesAndGrades = getCandi();
  return (
    <div className={styles.container}>
      <Header data={data} description="Godkjenn alle karakterer" page="task" />
      <main className={styles.main}>
        <div className={styles.listOfCards}>
          {listOfCandidatesAndGrades.map(
            (candidateAndGrade: candidateAndGradeType) => (
                <Link
                  key={candidateAndGrade.candidateId}
                  href={{
                    pathname: '/candidate',
                    query: { task: '2' },
                  }}
                  passHref
                >
                <Card className={styles.gradeCard}>
                  <strong>{candidateAndGrade.candidateId}</strong>
                  <span>{candidateAndGrade.grade}</span>
                </Card>
              </Link>
            )
          )}
        </div>
        <div style={{ padding: 20 }}>
          <Link href="/task" passHref>
            <Button style={{ marginLeft: 10 }} variant="contained">
              Fullfør
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Completion;
