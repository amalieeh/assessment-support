import * as React from 'react';
import styles from "../styles/Home.module.css";

interface textboxprop {
    text: string
}

const Textbox = (text:textboxprop) => {
    return (
        <p className={styles.card}>
            {text.text}
        </p>
    )
}

export default Textbox;
