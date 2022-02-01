import * as React from 'react';
import styles from "../styles/Textbox.module.css";
import Pointsbox from "./pointsbox";
import {useState} from "react";


export interface Option {
    value: number;
    label: string;
}
interface textboxprop {
    text: string |undefined;
    maxPoints: number;
}

const Textbox: React.FC<textboxprop> = (props: textboxprop) => {
    const [selectedOption, setSelectedOption] = useState<Option | null | undefined>();
    return (
        <div className={styles.card}>
            <div className={styles.alignTitlePoints}>
                <Pointsbox
                    maxPoints={props.maxPoints}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                />
            </div>
            {props.text}
        </div>
    )
};

export default Textbox;
