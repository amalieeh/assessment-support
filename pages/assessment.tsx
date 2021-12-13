import type { NextPage } from 'next'
import styles from '../styles/assessment.module.css'
import Textbox from "../components/textbox";
import { useState } from 'react';
import a from '../data/IT2810Høst2018.json'
import cleanHtmlText from "../functions/helpFunctions";


const Assessment: NextPage = () => {

  const answer_0: string = cleanHtmlText(a.ext_inspera_candidates[7].result.ext_inspera_questions[0].ext_inspera_candidateResponses[0].ext_inspera_response!)
  const answer_1: string = cleanHtmlText(a.ext_inspera_candidates[1].result.ext_inspera_questions[0].ext_inspera_candidateResponses[0].ext_inspera_response!)
  const answer_2: string = cleanHtmlText(a.ext_inspera_candidates[2].result.ext_inspera_questions[0].ext_inspera_candidateResponses[0].ext_inspera_response!)
  const answer_3: string = cleanHtmlText(a.ext_inspera_candidates[3].result.ext_inspera_questions[0].ext_inspera_candidateResponses[0].ext_inspera_response!)
  const answer_4: string = cleanHtmlText(a.ext_inspera_candidates[0].result.ext_inspera_questions[0].ext_inspera_candidateResponses[0].ext_inspera_response!)


  const answers: string[] = [answer_0, answer_1, answer_2, answer_3, answer_4, 'a','b','c']
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxItemsPerPage, setMaxItemsPerPage] = useState<number>(4);

  const changePage = (direction: string) : void => {
    if (direction == 'back') {
      setCurrentPage(currentPage - 1) 
    } else if (direction == 'next') {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className={styles.container}>
        <h1>
            {a.ext_inspera_assessmentRunTitle}
        </h1>
      <main className={styles.main}>
        {/* <div className={styles.wrapper}> */}
          <div className={styles.grid}>
            {/* slice(start, end) */}
            {answers.slice((currentPage * maxItemsPerPage) - maxItemsPerPage, currentPage * maxItemsPerPage ).map((answer: string) => <Textbox text={answer} maxPoints={5}/>)}          
          </div>
          <div className={styles.next}/>
        {/* </div>  */}
      </main>
      <footer className={styles.footer}> 
        <div>
            {currentPage > 1? 
              <button onClick={() => changePage('back')}>Back</button>
            : null}
            {answers.length - 1 > currentPage * maxItemsPerPage ? 
              <button onClick={() => changePage('next')}>Next</button>
            : null}
        </div>
      </footer>
    </div>
  )
}

export default Assessment
