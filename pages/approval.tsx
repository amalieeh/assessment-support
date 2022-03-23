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

const getAllAssessments = (taskNumber: number) => {
  const key = taskNumber.toString() + "_assessments";
  if (typeof window !== "undefined") {
    var assessments: AssessmentType[] =
      JSON.parse(localStorage.getItem(key) as string) || [];
    assessments.sort(function (a, b) {
      return a.candidateId - b.candidateId;
    });
    return assessments;
  } else {
    return [];
  }
};

const convertToNumber = (n: string | number) => {
  return parseInt(n);
};

// returns the each answer with assessment and potentially inconsistent values
function filterAssessments(assessments: AssessmentType[]) {

  const filteredAssessments = assessments.map((assessment: AssessmentType) => {
    const listOfUniqueAnswers:AssessmentType[] = assessments.filter((a) => a.answer == assessment.answer);
    console.log('list of unique answers', listOfUniqueAnswers);
    if (listOfUniqueAnswers.length > 1){
      // Hvis current assessment er den første av de to
      if (listOfUniqueAnswers.find(a => a.answer == assessment.answer) == assessment){
        let newAss: ApprovalType;
        if (listOfUniqueAnswers[0].score != listOfUniqueAnswers[1].score){
          console.log('1');
          const inconsistentValues: number[] = listOfUniqueAnswers.map(a => {return convertToNumber(a.score) });
          newAss = {...assessment, score:"-", assessmentId:uuidv4(), inconsistentScores: inconsistentValues};
        } else {
          console.log('2');
          newAss = {...assessment, score:"-", assessmentId:uuidv4()};
        }
        return newAss;
        //...
      } else {
        // only add if not there fra før
        return;
      }
    }
    return assessment;
  });
  // all assessments
  // if (two of same)
  //   create new assessment of type approval
  //   set new uuidv4()
  //  if (the two assessments has different scores)
  //    set empty score, set inconsistentScores

  // else: keep
  return filteredAssessments.filter(a => a != undefined)


};

const Approval: NextPage = () => {
  // create router object
  const router = useRouter();

  // isReady: boolean - checks whether the router fields are updated client-side and ready for use.
  useEffect(() => {
    if (!router.isReady) return;
    setTaskNumber(router.query.task);
  }, [router.isReady, router.query.task]);

  const [taskNumber, setTaskNumber] = useState<any>("");
  const assessments: AssessmentType[] = getAllAssessments(taskNumber);
  const filteredAssessments = filterAssessments(assessments);

  return (
    <div className={styles.container}>
      <h1>{data.ext_inspera_assessmentRunTitle}</h1>
      <main className={styles.main}>
        <Grid container gap={2} xs={5} item={true}>
          {assessments.length <= 0
            ? null
            : filteredAssessments.map((assessment: ApprovalType) => (
              <ApprovalTextbox
                key={assessment.assessmentId}
                assessment = {assessment}
              />
            ))}
        </Grid>
        <div style={{padding: 20}}>
          <Link
            href={{
              pathname: '/assessment',
              query: { task: taskNumber },
            }}
            passHref
          >
            <Button variant="contained">Tilbake</Button>
          </Link>
          <Link href="/task" passHref >
            <Button style={{marginLeft: 10}} variant="contained">Fullfør</Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Approval;
