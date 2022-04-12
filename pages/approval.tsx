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
import {
  saveAssessments,
  getApprovedAssessments,
  checkInconsistentScores,
  checkScores,
} from '../functions/helpFunctions';
import Tooltip from '@mui/material/Tooltip';
import Header from '../components/header';

const getAllAssessedAssessments = (taskNumber: number): AssessmentType[] => {
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
  const [taskTitle, setTaskTitle] = useState<string>('');

  const approvedAssessments: ApprovalType[] =
    getApprovedAssessments(taskNumber);

  const p = getAllAssessedAssessments(taskNumber);
  const filteredAssessments = filterAssessments(p);
  const [assessments, setAssessments] =
    useState<ApprovalType[]>(filteredAssessments);

  // isReady: boolean - checks whether the router fields are updated client-side and ready for use.
  useEffect(() => {
    if (!router.isReady) return;
    setTaskNumber(router.query.task);
    setTaskTitle(
      data.ext_inspera_candidates[0].result.ext_inspera_questions[
        router.query.task - 1
      ].ext_inspera_questionTitle
    );
  }, [router.isReady, router.query.task]);

  useEffect(() => {
    if (approvedAssessments.length != 0) {
      setAssessments(approvedAssessments);
    } else {
      setAssessments(filteredAssessments);
    }
  }, [filteredAssessments.length, approvedAssessments.length]);

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
      <Header
        data={data}
        taskNumber={taskNumber}
        description={taskTitle}
        goBackPage="assessment"
      />
      <main className={styles.main}>
        <Grid container gap={2} xs={5} item={true}>
          {assessments.map((assessment: ApprovalType) => (
            <ApprovalTextbox
              key={assessment.assessmentId}
              assessment={assessment}
              setAssessmentScore={setAssessmentScore}
            />
          ))}
        </Grid>
        <div style={{ padding: 20 }}>
          {checkInconsistentScores(assessments) == true ||
          checkScores(assessments) == false ? (
            <Tooltip
              title={
                <h3>For å godkjenne vurderingen må alle konflikter løses.</h3>
              }
            >
              <span>
                <Button
                  disabled
                  sx={{ textTransform: 'none' }}
                  variant="contained"
                  onClick={() => saveAssessments(assessments, key)}
                >
                  Godkjenn vurdering av oppgave {taskNumber}
                </Button>
              </span>
            </Tooltip>
          ) : (
            <Link href="/task" passHref>
              <Button
                sx={{ textTransform: 'none', marginLeft: 10 }}
                variant="contained"
                onClick={() => saveAssessments(assessments, key)}
              >
                Godkjenn vurdering av oppgave {taskNumber}
              </Button>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
};

export default Approval;
