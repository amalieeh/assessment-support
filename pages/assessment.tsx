import type { NextPage } from 'next'
import styles from '../styles/assessment.module.css'
import Textbox from "../components/textbox";
import { useState } from 'react';
import a from '../data/IT2810Høst2018.json'
import cleanHtmlText from "../functions/helpFunctions";


const Assessment: NextPage = () => {

  const content: string =   a.ext_inspera_candidates[0].result.ext_inspera_questions[0].ext_inspera_candidateResponses[0].ext_inspera_response!

  const string1: string = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  const string2: string = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."

  const answers: string[] = [content, cleanHtmlText(content), string1, string2, 'b', 'c', 'd', 'e', 'f', 'hallo', 'hei', 'hade', 'hallo', 'hei', 'hade','a', 'b', 'c', 'd', 'e', 'f', 'hallo', 'hei', 'hade', 'hallo', 'hei', 'hade','a', 'b', 'c', 'd', 'e', 'f', 'hallo', 'hei', 'hade']

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
            Eksamen TDT100
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
