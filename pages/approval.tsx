import { NextPage } from 'next';
import styles from '../styles/Main.module.css';
import data from '../data/IT2810Høst2018.json';
import Link from 'next/link';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import ApprovalTextbox from '../components/approvalTextbox';
import { ApprovalType, AssessmentType } from '../types/Types';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import findIndex from 'lodash/findIndex';
import cloneDeep from 'lodash/cloneDeep';
import { saveAssessments } from '../functions/helpFunctions';

const getAllAssessedAssessments = (taskNumber: number) : AssessmentType[] => {
  const key = taskNumber.toString() + '_assessments';
  if (typeof window !== 'undefined') {
    var assessments: AssessmentType[] =
      JSON.parse(localStorage.getItem(key) as string) || [];
    return assessments;
  } else {
    return [];
  }
};

const convertToNumber = (n: string | number) => {
  if (typeof n == 'number') {
    return n;
  }
  return parseInt(n);
};

// returns the each assessment with potentially inconsistent values
function filterAssessments(assessments: AssessmentType[]): ApprovalType[] {
  const uniqueAssessments: AssessmentType[] = assessments
    .sort((a: AssessmentType, b: AssessmentType) => {
      return a.candidateId - b.candidateId;
    })
    .filter((assessment, index, array) => {
      return !index || assessment.candidateId != array[index - 1].candidateId;
    });
  const approvalAssessments: ApprovalType[] = uniqueAssessments.map(
    (assessment: AssessmentType) => {
      const listOfAssessmentsFromSameCandidate = assessments.filter(
        (a) => a.candidateId == assessment.candidateId
      );
      // If the assessment has been reassessed
      if (listOfAssessmentsFromSameCandidate.length > 1) {
        let newAss: ApprovalType;
        // If the scores are inconsistent
        if (
          listOfAssessmentsFromSameCandidate[0].score !=
          listOfAssessmentsFromSameCandidate[1].score
        ) {
          const inconsistentValues: number[] =
            listOfAssessmentsFromSameCandidate.map((a) => {
              return convertToNumber(a.score);
            });
          newAss = {
            ...assessment,
            score: '',
            assessmentId: uuidv4(),
            inconsistentScores: inconsistentValues,
          };
        } else {
          newAss = { ...assessment, score: '', assessmentId: uuidv4() };
        }
        return newAss;
      } else {
        return assessment;
      }
    }
  );
  return approvalAssessments;
}

const Approval: NextPage = () => {
  // create router object
  const router = useRouter();

  const [taskNumber, setTaskNumber] = useState<any>('');
  const p = getAllAssessedAssessments(taskNumber);
  const filteredAssessments = filterAssessments(p);
  const [assessments, setAssessments] = useState<ApprovalType[]>(filteredAssessments);

  // isReady: boolean - checks whether the router fields are updated client-side and ready for use.
  useEffect(() => {
    if (!router.isReady) return;
    setTaskNumber(router.query.task);
  }, [router.isReady, router.query.task]);

  useEffect(() => {
    setAssessments(filteredAssessments)
  }, [filteredAssessments.length]);

  const setAssessmentScore = (
    assessment: AssessmentType,
    newScore: number | string
  ) => {
    const newAssessment: AssessmentType = {
      assessmentId: assessment.assessmentId,
      answer: assessment.answer,
      candidateId: assessment.candidateId,
      maxPoints: assessment.maxPoints,
      taskNumber: assessment.taskNumber,
      score: newScore,
      isFlagged: assessment.isFlagged,
    };
    const index = findIndex(assessments, {
      assessmentId: assessment.assessmentId,
    });
    const newArr: AssessmentType[] = cloneDeep(assessments);
    newArr.splice(index, 1, newAssessment);
    setAssessments(newArr);
  };

  const key = taskNumber.toString() + '_approved';

  return (
    <div className={styles.container}>
      <h1>{data.ext_inspera_assessmentRunTitle}</h1>
      <main className={styles.main}>
        <Grid container gap={2} xs={5} item={true}>
          {assessments.map((assessment: ApprovalType) => (
            <ApprovalTextbox
              key={assessment.assessmentId}
              assessment = {assessment}
              setAssessmentScore={setAssessmentScore}
            />
          ))}
        </Grid>
        <div style={{ padding: 20 }}>
          <Link
            href={{
              pathname: '/assessment',
              query: { task: taskNumber },
            }}
            passHref
          >
            <Button variant="contained">Tilbake</Button>
          </Link>
          <Link href="/task" passHref>
            <Button
              style={{ marginLeft: 10 }}
              variant="contained"
              onClick={() => saveAssessments(filteredAssessments, key)}
            >
              Fullfør
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Approval;
