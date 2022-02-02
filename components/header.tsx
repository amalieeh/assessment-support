import React from 'react';
import styles from '../styles/Header.module.css'
import Link from "next/link";

interface Headerprops {
  data: any;
  taskNumber?: number;
}

const Header: React.FC<Headerprops> = (props: Headerprops) => {

  return (
    <div className={styles.headerstyle}>
      <Link href="/">
        <h1 className={styles.makeClickable}>
          {props.data.ext_inspera_assessmentRunTitle}
        </h1>
      </Link>
        {props.taskNumber && props.taskNumber >= 1 ?
          <h2>
            Oppgave {props.data.ext_inspera_candidates[0].result.ext_inspera_questions[props.taskNumber-1].ext_inspera_questionNumber}
          </h2>
        : null}
    </div>
  );
};

export default Header;

