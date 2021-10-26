import type { NextPage } from 'next'
import styles from '../styles/assessment.module.css'
import Textbox from "../components/textbox";


const Assessment: NextPage = () => {

  let answers: string[] = ['hallo', 'hei', 'hade']

  return (
    <div className={styles.container}>
        <h1>
            Eksamen TDT100
        </h1>
      <main className={styles.main}>
        <div className={styles.wrapper}>
        <div className={styles.grid}>
          {answers.map((answer: string) => <Textbox text={answer}/>)}          

        </div>
        <div className={styles.next}>
        </div>
        </div>
      </main>
      <footer className={styles.footer}> 
         <h1> . </h1>
      </footer>
    </div>
  )
}

export default Assessment
