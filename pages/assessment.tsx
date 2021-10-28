import type { NextPage } from 'next'
import styles from '../styles/assessment.module.css'
import Textbox from "../components/textbox";
import { useState } from 'react';


const Assessment: NextPage = () => {

  let answers: string[] = ['hallo', 'hei', 'hade','a', 'b', 'c', 'd', 'e', 'f', 'hallo', 'hei', 'hade', 'hallo', 'hei', 'hade','a', 'b', 'c', 'd', 'e', 'f', 'hallo', 'hei', 'hade', 'hallo', 'hei', 'hade','a', 'b', 'c', 'd', 'e', 'f', 'hallo', 'hei', 'hade']

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxItemsPerPage, setMaxItemsPerPage] = useState<number>(8);

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
            Eksamen TDT100
        </h1>
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.grid}>
            {/* slice(start, end) */}
            {answers.slice((currentPage * maxItemsPerPage) - maxItemsPerPage, currentPage * maxItemsPerPage ).map((answer: string) => <Textbox text={answer}/>)}          
          </div>
          <div className={styles.next}/>
        </div> 
      </main>
      <footer className={styles.footer}> 
        <div>
            {currentPage > 1? 
              <button onClick={() => changePage('back')}>back</button>
            : null}
            {answers.length - 1 > currentPage * maxItemsPerPage ? 
              <button onClick={() => changePage('next')}>next</button>
            : null}
        </div>
      </footer>
    </div>
  )
}

export default Assessment
