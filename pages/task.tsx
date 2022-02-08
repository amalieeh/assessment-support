import { NextPage } from 'next'
import styles from '../styles/assessment.module.css'
import data from '../data/IT2810Høst2018.json'
import Header from "../components/header";
import {Button} from "@mui/material";

const Approval: NextPage = () => {

    const totalTasks: number = data.ext_inspera_candidates[0].result.ext_inspera_questions.length;
    const taskNumbers: number[] = Array.from(Array(totalTasks).keys())

  

  return (
    <div className={styles.container}>
        <Header data={data}/> 
      <main>
          {taskNumbers.map(
              (taskNum: number ) => <Button key={taskNum+1} variant="contained" sx={{width: 70, height: 70, fontSize: 25, margin: 3}}> {taskNum+1} </Button>
        )}
      </main>
    </div>
  )
};

export default Approval
