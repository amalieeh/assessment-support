import { NextPage } from 'next';
import styles from '../styles/Completion.module.css';
import data from '../data/IT2810Høst2018.json';
import Link from 'next/link';
import { Button, Snackbar } from '@mui/material';
import * as React from 'react';
import Header from '../components/header';
import {
  ApprovalType,
  AssessmentType,
  candidateAndGradeType,
  candidateAndSumType,
  candidateAndGradeAssessmentType
} from '../types/Types';
import {
  convertToNumber,
  getSumMaxScoresAllTasks, gradeLabels,
  isAllTasksAssessed,
  taskNums
} from '../functions/helpFunctions';
import Card from '@material-ui/core/Card';
import cloneDeep from 'lodash/cloneDeep';
import Gradingbuttons from '../components/gradingbuttons';
import { useEffect } from 'react';

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
  const [candidateGrades, setCandidateGrades] = React.useState<candidateAndGradeType[]>(listOfCandidatesAndGrades);

  useEffect(() => {
    if (candidateGrades.length == 0) {
      setCandidateGrades(listOfCandidatesAndGrades);
    }
  }, [candidateGrades.length, candidateGrades]);

  const setCandidateGradesScore = (assessment: candidateAndGradeAssessmentType | AssessmentType | ApprovalType, newScore: number | string) => {
    const index = candidateGrades.findIndex((c) => c.candidateId == assessment.candidateId);
    const newElement: candidateAndGradeType = {candidateId: assessment.candidateId, grade: gradeLabels[convertToNumber(newScore)*5]}
    const newArr: candidateAndGradeType[] = cloneDeep(candidateGrades);
    newArr.splice(index, 1, newElement);
    setCandidateGrades(newArr)
  };

  function convertToCandidateAndGradeAssessmentType(grade: string, candidateId: number): candidateAndGradeAssessmentType {
    return {candidateId: candidateId, score: convertFromGradeToScore(grade), maxPoints: 1}
  }

  function convertFromGradeToScore(grade: string): number {
    const i = gradeLabels.findIndex((e: string) => e == grade);
    return i/5;
  }

  return (
    <div className={styles.container}>
      <Header
        data={data}
        description="Godkjenn karakterer"
        goBackPage="task"
      />
      <main className={styles.main}>
        <div className={styles.listOfCards}>
          {candidateGrades.map(
            (candidateAndGrade: candidateAndGradeType) => (
                <Card className={styles.gradeCard} >
                  <Link
                    key={candidateAndGrade.candidateId}
                    href={{
                      pathname: '/candidate',
                      query: { id: candidateAndGrade.candidateId.toString() },
                    }}
                    passHref
                  >
                    <div style={{display: 'flex', alignItems: 'flex-end', cursor: 'pointer', width: '360px' }}>
                      Kandidat {candidateAndGrade.candidateId}
                    </div>
                  </Link>

                  <Gradingbuttons
                    score={convertFromGradeToScore(candidateAndGrade.grade)}
                    assessment={convertToCandidateAndGradeAssessmentType(candidateAndGrade.grade, candidateAndGrade.candidateId)}
                    setAssessmentScore={setCandidateGradesScore} />
                </Card>
            )
          )}
        </div>
        <div style={{ padding: 20 }}>
          <Link href={'/print'}>
            <Button style={{ marginLeft: 10 }} variant="contained">
              Godkjenn alle karakterer
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Completion;
