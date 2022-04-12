import React from 'react';
import styles from '../styles/Header.module.css';
import Link from 'next/link';
import { Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

interface Headerprops {
  data: any;
  taskNumber?: number;
  description?: string;
  goBackPage?: string;
}

const Header: React.FC<Headerprops> = (props: Headerprops) => {
  return (
    <div className={styles.headerstyle}>
      {props.goBackPage == 'assessment' && props.taskNumber ? (
        <Link
          href={{
            pathname: '/' + props.goBackPage,
            query: { task: props.taskNumber },
          }}
          passHref
        >
          <div className={styles.button}>
            <Button>
              <KeyboardBackspaceIcon
                fontSize="large"
                style={{ color: '#000000' }}
              />
            </Button>
          </div>
        </Link>
      ) : (
        <Link
          href={{
            pathname: '/' + props.goBackPage,
          }}
          passHref
        >
          <div className={styles.button}>
            <Button>
              <KeyboardBackspaceIcon
                fontSize="large"
                style={{ color: '#000000' }}
              />
            </Button>
          </div>
        </Link>
      )}

      <div className={styles.titles}>
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
    </div>
  );
};

export default Header;
