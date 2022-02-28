import React from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";

interface Headerprops {
  data: any;
  taskNumber?: number;
  description?: string;
}

const Header: React.FC<Headerprops> = (props: Headerprops) => {
  return (
    <div className={styles.headerstyle}>
      {props.taskNumber && props.description ? (
        <h1>
          Oppgave {props.taskNumber} : {props.description}
        </h1>
      ) : (
        <h1>{props.description}</h1>
      )}
      <Link href="/">
        <h2 className={styles.makeClickable}>
          {props.data.ext_inspera_assessmentRunTitle}
        </h2>
      </Link>
    </div>
  );
};

export default Header;
