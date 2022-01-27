import type { NextPage } from 'next'
import styles from '../styles/assessment.module.css'
import Textbox from "../components/textbox";
import { useState } from 'react';
import data from '../data/IT2810Høst2018.json'
import cleanHtmlText from "../functions/helpFunctions";


const Assessment: NextPage = () => {

  //fw: create new logic to get data
  const answer_0: string = cleanHtmlText(data.ext_inspera_candidates[0].result.ext_inspera_questions[0].ext_inspera_candidateResponses[0].ext_inspera_response!)
  const answer_1: string = cleanHtmlText(data.ext_inspera_candidates[1].result.ext_inspera_questions[0].ext_inspera_candidateResponses[0].ext_inspera_response!)
  const answer_2: string = cleanHtmlText(data.ext_inspera_candidates[2].result.ext_inspera_questions[0].ext_inspera_candidateResponses[0].ext_inspera_response!)
  const answer_3: string = cleanHtmlText(data.ext_inspera_candidates[3].result.ext_inspera_questions[0].ext_inspera_candidateResponses[0].ext_inspera_response!)
  const answer_4: string = cleanHtmlText(data.ext_inspera_candidates[4].result.ext_inspera_questions[0].ext_inspera_candidateResponses[0].ext_inspera_response!)
  const answer_5: string = cleanHtmlText(data.ext_inspera_candidates[5].result.ext_inspera_questions[0].ext_inspera_candidateResponses[0].ext_inspera_response!)
  const answer_6: string = cleanHtmlText(data.ext_inspera_candidates[6].result.ext_inspera_questions[0].ext_inspera_candidateResponses[0].ext_inspera_response!)
  
  

  const answers: string[] = [answer_0, answer_1, answer_2, answer_3, answer_4, answer_5, answer_6]
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxItemsPerPage, setMaxItemsPerPage] = useState<number>(4); //max items set to 4 as default


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
          <div className={styles.grid}>
            {answers.slice((currentPage * maxItemsPerPage) - maxItemsPerPage, currentPage * maxItemsPerPage ).map(
                (answer: string) => <Textbox key={answer} text={answer} maxPoints={5}/>)}
          </div>
          <div className={styles.next}/>
      </main>
      <footer className={styles.footer}> 
        <div>
            {currentPage > 1? 
              <button onClick={() => changePage('back')}>Back</button>
            : null}
            {answers.length - 1 >= currentPage * maxItemsPerPage ? 
              <button onClick={() => changePage('next')}>Next</button>
            : null}
        </div>
      </footer>
    </div>
  )
};

export default Assessment
