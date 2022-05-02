import { NextPage } from 'next';
import styles from '../styles/Completion.module.css';
import data from '../data/IT2810Høst2018.json';
import Grid from '@mui/material/Grid';
import { ApprovalType, AssessmentType } from '../types/Types';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import findIndex from 'lodash/findIndex';
import cloneDeep from 'lodash/cloneDeep';
import { taskNums } from '../functions/helpFunctions';
import Header from '../components/header';
import CandidateTextbox from '../components/candidateTextbox';

function getAllAssessmentsFromCandidate(candidateId: number): ApprovalType[] {
  let approvedAssessments: ApprovalType[] = [];

  if (typeof window == 'undefined' || isNaN(candidateId) || candidateId == 0) {
    return approvedAssessments;
  } else {
    for (let i = 0; i < taskNums.length; i++) {
      const e = JSON.parse(
        localStorage.getItem(taskNums[i].toString() + '_approved') as string
      );
      const j = e.findIndex((a: ApprovalType) => a.candidateId == candidateId);
      approvedAssessments.push(e[j]);
    }
    return approvedAssessments;
  }
}

function setAssessmentScoreLocalStorage(
  assessment: AssessmentType,
  newScore: number | string
) {
  if (typeof window !== 'undefined') {
    const key = assessment.taskNumber.toString() + '_approved';
    let approvedAssessments = JSON.parse(localStorage.getItem(key) as string);
    const newAssessment: AssessmentType = {
      assessmentId: assessment.assessmentId,
      answer: assessment.answer,
      candidateId: assessment.candidateId,
      maxPoints: assessment.maxPoints,
      taskNumber: assessment.taskNumber,
      score: newScore,
      isFlagged: assessment.isFlagged,
    };
    const index = findIndex(approvedAssessments, {
      assessmentId: assessment.assessmentId,
    });
    approvedAssessments.splice(index, 1, newAssessment);
    localStorage.setItem(key, JSON.stringify(approvedAssessments));
  }
}

const Candidate: NextPage = () => {
  // create router object
  const router = useRouter();
  const [candidateId, setcandidateId] = useState<any>('');

  const waitList = getAllAssessmentsFromCandidate(parseInt(candidateId));
  const [assessments, setAssessments] = useState<ApprovalType[]>([]);

  // isReady: boolean - checks whether the router fields are updated client-side and ready for use.
  useEffect(() => {
    if (!router.isReady) return;
    setcandidateId(router.query.id);
    const approvedAssessments: ApprovalType[] = getAllAssessmentsFromCandidate(
      candidateId
    );
    setAssessments(approvedAssessments);
  }, [router.isReady, router.query.id]);

  useEffect(() => {
    setAssessments(waitList);
  }, [waitList.length]);

  const setAssessmentScoreState = (
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

  const setAssessmentScore = (
    assessment: AssessmentType,
    newScore: number | string
  ) => {
    // One can no longer set an empty score
    if (typeof newScore == 'number') {
      setAssessmentScoreState(assessment, newScore);
      setAssessmentScoreLocalStorage(assessment, newScore);
    }
  };

  return (
    <div className={styles.container}>
      <Header
        data={data}
        description={'Rettinger av kandidat ' + candidateId}
        goBackPage="completion"
      />
      <main className={styles.main}>
        <Grid container gap={2} xs={5} item={true}>
          {assessments.length > 0
            ? assessments.map((assessment: ApprovalType) => (
                <CandidateTextbox
                  key={assessment.assessmentId}
                  assessment={assessment}
                  setAssessmentScore={setAssessmentScore}
                />
              ))
            : null}
        </Grid>
        <div style={{ padding: 20 }}></div>
      </main>
    </div>
  );
};

export default Candidate;
