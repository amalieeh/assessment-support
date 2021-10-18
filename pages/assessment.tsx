import type { NextPage } from 'next'
import Pointsbox from '../components/pointsbox'
import styles from '../styles/assessment.module.css'



const Assessment: NextPage = () => {
  return (
    <div className={styles.container}>
        <h1>
            Eksamen TDT100
        </h1>
      <main className={styles.main}>
        <div className={styles.wrapper}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.alignTitlePoints}>
              <h2>Card 1 </h2>
              <Pointsbox />
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          </div>
        

          <div className={styles.card}>
            <div className={styles.alignTitlePoints}>
              <h2>Learn &rarr;</h2>
              <Pointsbox />
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          </div>

          <div className={styles.card}>
          <div className={styles.alignTitlePoints}>
            <h2>Examples &rarr;</h2>
            <Pointsbox />    
          </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>    
          </div>

          <div className={styles.card}>
            <div className={styles.alignTitlePoints}>
                <h2>Deploy &rarr;</h2>
                <Pointsbox />
            </div>    
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          </div> 
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
