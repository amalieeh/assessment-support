import * as React from 'react';
import styles from "../styles/Home.module.css";

interface textboxprop {
    text: string

}

const Textbox = (text:textboxprop) => {
    return (
        <p className={styles.card}>
            <p>{text.text}</p>
        </p>
    )
}

export default Textbox;
