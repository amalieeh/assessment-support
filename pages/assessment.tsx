import { NextPage } from 'next'
import styles from '../styles/assessment.module.css'
import Textbox from "../components/textbox";
import { useState} from 'react';
import data from '../data/IT2810Høst2018.json'
import Expand from '../components/expand';
import {insperaDataToTextboxObject} from "../functions/helpFunctions";
import {TextboxDataType} from "../types/Types";
import Link from "next/link";
import {Button} from "@mui/material";


const Assessment: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxItemsPerPage, setMaxItemsPerPage] = useState<number>(4); //max items set to 4 as default

  const taskDescription: string = 'Variabler med nøkkelordet var er globale, mens varibler med nøkkelordet let har et local scope eller blokk scope som vil si at de kun defineres for deler av koden om de defineres inni en kodeblokk.'
  const answers_1: TextboxDataType[] = insperaDataToTextboxObject(data, 1);
  const maxPoints: number = data.ext_inspera_candidates[0].result.ext_inspera_questions[0].ext_inspera_maxQuestionScore;

  const changePage = (direction: string) : void => {
    if (direction == 'back') {
      setCurrentPage(currentPage - 1)
    } else if (direction == 'next') {
      setCurrentPage(currentPage + 1)
    }
  };
  

  return (
    <div className={styles.container}>
      <h1>
          {data.ext_inspera_assessmentRunTitle}
      </h1>
      
      <main className={styles.main}>
        <Expand 
          taskDescriptionTitle='User interfaces' 
          taskDescription={taskDescription}>
        </Expand>
          <div className={styles.grid}>
            {answers_1.slice((currentPage * maxItemsPerPage) - maxItemsPerPage, currentPage * maxItemsPerPage ).map(
                (answer: TextboxDataType) => <Textbox key={answer.answerId} text={answer.answer} maxPoints={maxPoints}/>
                )}
          </div>
      </main>
      <div className={styles.footer}>
        {currentPage > 1? 
          <div className={styles.leftArrow} onClick={() => changePage('back')}></div>
        : null}
        {answers_1.length - 1 >= currentPage * maxItemsPerPage ?
            <div className={styles.rightArrow} onClick={() => changePage('next')}></div>
        : null}
        {currentPage * maxItemsPerPage >= answers_1.length-1 ?
          <Link href="/approval">
            <Button variant="contained">
              Finish
            </Button>
          </Link>
        : null}
      </div>
    </div>
  )
};

export default Assessment
