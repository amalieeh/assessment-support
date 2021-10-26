import * as React from 'react';
import styles from "../styles/Textbox.module.css";
import Pointsbox from "./pointsbox";

interface textboxprop {
    text: string
}

const Textbox = (text:textboxprop) => {
    return (
        <div className={styles.card}>
            <div className={styles.alignTitlePoints}>
                <Pointsbox maxPoints={8}/>
            </div>
            {text.text}
        </div>






)
}

export default Textbox;
