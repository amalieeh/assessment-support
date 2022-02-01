import { NextPage } from 'next'
import styles from '../styles/assessment.module.css'
import data from '../data/IT2810Høst2018.json'
import Link from "next/link";
import {Button} from "@mui/material";


const Approval: NextPage = () => {

  return (
    <div className={styles.container}>
      <h1>
        {data.ext_inspera_assessmentRunTitle}
      </h1>
      <main className={styles.main}>
        <Link href="/assessment">
          <Button variant="contained">
            Back
          </Button>
        </Link>
      </main>
    </div>
  )
};

export default Approval
