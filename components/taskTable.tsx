import * as React from 'react';
import data from '../data/IT2810Høst2018.json';
import CheckIcon from '@mui/icons-material/Check';
import styles from '../styles/taskTable.module.css';

interface Tasktableprops {
  taskNumbers: number[];
}

function getTaskTitle(taskNumber: number) {
  return data.ext_inspera_candidates[0].result.ext_inspera_questions[taskNumber]
    .ext_inspera_questionTitle;
}

function checkApproved(taskNumber: number): boolean {
  if (typeof window !== 'undefined') {
    if (taskNumber.toString() + '_approved' in localStorage) {
      return true;
    }
  }
  return false;
}

const TaskTable: React.FC<Tasktableprops> = (props: Tasktableprops) => {
  return (
    <div className={styles.container}>
      {props.taskNumbers.map((taskNum: number) => {
        if (checkApproved(taskNum + 1) == true) {
          return (
            <div className={styles.items}>
              <div>Oppgave {taskNum + 1}</div>
              <div className={styles.title}>{getTaskTitle(taskNum)}</div>
              <div>
                <CheckIcon color="success" />
              </div>
            </div>
          );
        } else {
          return (
            <div className={styles.items}>
              <div>Oppgave {taskNum + 1}</div>
              <div className={styles.title}>{getTaskTitle(taskNum)}</div>
              <div>
                <CheckIcon sx={{ color: 'white' }} />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default TaskTable;
