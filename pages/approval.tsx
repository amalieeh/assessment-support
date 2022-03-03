import { NextPage } from "next";
import styles from "../styles/approval.module.css";
import data from "../data/IT2810Høst2018.json";
import Link from "next/link";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import ApprovalTextbox from "../components/approvalTextbox";
import { approvaltextboxprop, AssessmentType } from "../types/Types";
import * as React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const getAssessments = (taskNumber: number) => {
  const key = taskNumber.toString() + "_assessments";
  if (typeof window !== "undefined") {
    var assessments: AssessmentType[] =
      JSON.parse(localStorage.getItem(key) as string) || [];
    assessments.sort(function(a, b) {
      return a.candidateId - b.candidateId;
    })
    return assessments
  } else {
    return [];
  }

}

const Approval: NextPage = () => {
  // create router object
  const router = useRouter();

  // isReady: boolean - checks whether the router fields are updated client-side and ready for use.
  useEffect(() => {
    if (!router.isReady) return;
    setTaskNumber(router.query.task);
  }, [router.isReady, router.query.task]);

  const [taskNumber, setTaskNumber]  = useState<any>("");
  const assessments: AssessmentType[] = getAssessments(taskNumber);

  return (
    <div className={styles.container}>
      <h1>{data.ext_inspera_assessmentRunTitle}</h1>
      <main className={styles.main}>
        <Grid container gap={2} xs={5} item={true}>
          {assessments.length <= 0 ? null : assessments.map((assessment: AssessmentType) => (
            <ApprovalTextbox
              key={assessment.assessmentId}
              assessmentId={assessment.assessmentId}
              answer={assessment.answer}
              candidateId={assessment.candidateId}
              taskNumber={assessment.taskNumber}
              maxPoints={assessment.maxPoints}
              score={assessment.score}
            />
          ))}
        </Grid>
        <div style={{ padding: 20 }}>
          <Link href={{
            pathname: "/assessment",
            query: { task: taskNumber},
          }} passHref>
            <Button variant="contained">Back</Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Approval;
