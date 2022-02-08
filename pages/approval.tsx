import { NextPage } from 'next'
import styles from '../styles/approval.module.css'
import data from '../data/IT2810Høst2018.json'
import Link from "next/link";
import {Button} from "@mui/material";
import Grid from '@mui/material/Grid';
import ApprovalTextbox from "../components/approvalTextbox";
import { approvaltextboxprop } from '../types/Types';
import * as React from "react";


const Approval: NextPage = () => {
  const answers: approvaltextboxprop[] = [
    { answerId: '1006_23424',
      candidateId: '1006',
      answer: 'This is my answer',
      points: '1 p'
    },
    { answerId: '1007_23424',
      candidateId: '1007',
      answer: 'This is my answer',
      points: '0 p'
    },
    { answerId: '1016_23424',
      candidateId: '1016',
      answer: 'This is my very very long answer as an example for this since we need to check how it works with lots of text',
      points: '2 p'
    },
    { answerId: '1254_23424',
      candidateId: '1254',
      answer: 'This is my answer',
      points: '4 p'
    },
  ];

  return (
    <div className={styles.container}>
      <h1>
        {data.ext_inspera_assessmentRunTitle}
      </h1>
      <main className={styles.main}>
        <Grid container gap={2} xs={5}>
        {answers.map((answer: approvaltextboxprop) => <ApprovalTextbox
          key={answer.answerId}
          candidateId={answer.candidateId}
          answer={answer.answer}
          points={answer.points}
          answerId={''} />)}
        </Grid>
        <div style={{padding: 20}}>
          <Link  href="/assessment">
            <Button  variant="contained">
              Back
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
};

export default Approval
