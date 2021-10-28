import * as React from 'react';
import styles from "../styles/Textbox.module.css";
import Pointsbox from "./pointsbox";

interface textboxprop {
    text: string,
    maxPoints: number
}
const Textbox = (props: textboxprop) => {
    return (
        <div className={styles.card}>
            <div className={styles.alignTitlePoints}>
                <Pointsbox maxPoints={props.maxPoints}/>
            </div>
            {props.text}
        </div>
    )
};

export default Textbox;
