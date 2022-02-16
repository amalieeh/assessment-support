import { NextPage } from "next";
import * as React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { Button } from "@mui/material";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Hello and welcome to this assessment support software!</h1>
      <Link href="/task">
        <Button variant="contained">View tasks</Button>
      </Link>
    </div>
  );
};

export default Home;
