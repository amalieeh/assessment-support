import { NextPage } from 'next'
import styles from '../styles/assessment.module.css'
import data from '../data/IT2810Høst2018.json'
import Header from "../components/header";
import { Button, Grid } from "@mui/material";
import Link from "next/link";


const Task: NextPage = () => {
  const totalTasks: number = data.ext_inspera_candidates[0].result.ext_inspera_questions.length;
  const taskNumbers: number[] = Array.from(Array(totalTasks).keys());

  return (
    <div className={styles.container}>
        <Header data={data} description={'Oversikt over alle oppgavene'}/>
      <main style={{display: 'flex', justifyContent: 'center'}}>

        <Grid container gap={4} sx={{ maxWidth: 1230 }}>
          {taskNumbers.map(
              (taskNum: number ) => <Link key={taskNum+1} href={'/assessment'} passHref>
                <Button key={taskNum+1} variant="contained" sx={{width: 73, height: 73, fontSize: 25,}}> {taskNum+1} </Button>
              </Link>
        )}
        </Grid>
      </main>
    </div>
  )
};

export default Task
