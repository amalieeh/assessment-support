import React from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";

interface Headerprops {
  data: any;
  description?: string;
}

const Header: React.FC<Headerprops> = (props: Headerprops) => {
  return (
    <div className={styles.headerstyle}>
      <Link href="/">
        <h1 className={styles.makeClickable}>
          {props.data.ext_inspera_assessmentRunTitle}
        </h1>
      </Link>
      {props.description ? <h2>{props.description}</h2> : null}
    </div>
  );
};

export default Header;
