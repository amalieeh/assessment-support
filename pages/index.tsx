import { NextPage } from 'next';
import * as React from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { Button } from '@mui/material';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Ditt datasett har blitt lastet opp. Vennligst fortsett.</h1>
      <Link href="/task" passHref>
        <Button variant="contained">Se oppgaver</Button>
      </Link>
    </div>
  );
};

export default Home;
