import { NextPage } from 'next';
import styles from '../styles/Assessment.module.css';
import mainStyles from '../styles/Main.module.css';
import Textbox from '../components/textbox';
import { useEffect, useState } from 'react';
import data from '../data/IT2810Høst2018.json';
import Expand from '../components/expand';
import ConsistencyBox from '../components/consistencybox';
import Sortingbox from '../components/sortingbox';
import {
  chooseCorrelatedAssessment,
  insperaDataToTextboxObject,
  saveBatch,
} from '../functions/helpFunctions';
import { sortAnswers } from '../functions/sortAlgorithms';
import { AnswerType, AssessmentType } from '../types/Types';
import Link from 'next/link';
import { Button } from '@mui/material';
import Header from '../components/header';
import findIndex from 'lodash/findIndex';
import cloneDeep from 'lodash/cloneDeep';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import Togglebuttons from '../components/togglebuttons';

const Assessment: NextPage = () => {
  // create router object
  const router = useRouter();

  // isReady: boolean - checks whether the router fields are updated client-side and ready for use.
  useEffect(() => {
    if (!router.isReady) return;
    setTaskNumber(router.query.task);
    setTaskTitle(
      data.ext_inspera_candidates[0].result.ext_inspera_questions[
        router.query.task - 1
      ].ext_inspera_questionTitle
    );
  }, [router.isReady, router.query.task]);

  const [taskNumber, setTaskNumber] = useState<any>('');
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxItems, setMaxItems] = useState<string>('4'); //max items set to 4 as default
  const [sortingAlgorithm, setSortingAlgorithm] = useState<string>('random');

  const taskDescription: string =
    'Variabler med nøkkelordet var er globale, mens varibler med nøkkelordet let har et local scope eller blokk scope som vil si at de kun defineres for deler av koden om de defineres inni en kodeblokk.';
  const markersGuideDescription: string =
    'let - block scope. Dersom variabelen blir deklarert med let i en funksjon, er den bare tilgjengelig i funksjonen. var - global scope Dersom variabelen blir deklarert med var, blir den tilgjengelig i all kode. Kan by på problemer når vi gir variabler samme navn.';

  const allAnswers: AnswerType[] = insperaDataToTextboxObject(data, taskNumber);
  const answers = allAnswers.slice(0,10);
  const numberOfAnswers = answers.length;

  const p = answers.map((answer: AnswerType) => ({ score: '', isFlagged: false, ...answer }));
  const [assessments, setAssessments] = useState<AssessmentType[]>(p);

  const maxItemsPerPage = parseInt(maxItems);

  const startIndexBatch = currentPage * maxItemsPerPage - maxItemsPerPage;
  const endIndexBatch = currentPage * maxItemsPerPage;

  // currently works in one case: when the data is loaded and no assessments have been made
  // needs to be updated to only sort the rest of the assessments that have not been assessed
  // in relation to data retrieval for textboxes
  useEffect(() => {
    sortAnswers(answers, sortingAlgorithm);
    setAssessments(
      answers.map((answer: AnswerType) => ({ score: '', ...answer }))
    );
  }, [sortingAlgorithm]);

  // to make sure setAssessments is being set, otherwise it is empty
  useEffect(() => {
    if (assessments.length == 0) {
      setAssessments(p);
    }
  }, [assessments.length, p]);

  const changePage = (direction: string): void => {
    if (direction == 'back') {
      setCurrentPage(currentPage - 1);
    } else if (direction == 'next') {
      appendReAssessments(assessments.slice(startIndexBatch, endIndexBatch));
      saveBatch(assessments.slice(startIndexBatch, endIndexBatch), taskNumber);
      setCurrentPage(currentPage + 1);
    }
  };

  const appendReAssessments = (batch: AssessmentType[]) => {
    // if an outlier was returned and the reAssessment-list is not full (over 20%), then append (if it is not there already)
    const maxReAssessmentPercentage = 0.2;
    if (
      // not currently assessing a reAssessment
      currentPage * (maxItemsPerPage - 1) < numberOfAnswers
    ) {
      const assessment = chooseCorrelatedAssessment(batch);
      if (
        // chooseCorrelatedAssessment actually found an assessment
        assessment != null &&
        // there is not more reAssessments than the threashold
        assessments.length - numberOfAnswers <
          Math.floor(numberOfAnswers * maxReAssessmentPercentage) &&
        // the assessments is not already in the "re-part" of assessments
        assessments.filter((a) => a.answer == assessment.answer).length <= 1
      ) {
        const newArr: AssessmentType[] = cloneDeep(assessments);
        newArr.push({ ...assessment, score: '', assessmentId: uuidv4() });
        setAssessments(newArr);
      }
    }
  };

  const setAssessmentScore = (
    assessment: AssessmentType,
    newScore: number | string
  ) => {
    const newAssessment = {
      ...assessment,
      score: newScore,
    };
    const index = findIndex(assessments, {
      assessmentId: assessment.assessmentId,
    });
    const newArr: AssessmentType[] = cloneDeep(assessments);
    newArr.splice(index, 1, newAssessment);
    setAssessments(newArr);
  };

  const toggleFlag = (
    assessment: AssessmentType,
  ) => {
    const newAssessment = {
      ...assessment,
      isFlagged: !assessment.isFlagged,
    };
    const index = findIndex(assessments, {
      assessmentId: assessment.assessmentId,
    });
    const newArr: AssessmentType[] = cloneDeep(assessments);
    newArr.splice(index, 1, newAssessment);
    setAssessments(newArr);
  };

  const handleSetMaxItems = (
    event: React.MouseEvent<HTMLElement>,
    value: string | null
  ) => {
    if (value !== null) {
      setMaxItems(value);

      const numberOfAssessedAssessments = assessments.filter(
        (assessment) => assessment.score !== ''
      ).length;
      const newPageNumber = Math.ceil(
        numberOfAssessedAssessments / parseInt(value) + 0.01
      );
      setCurrentPage(newPageNumber);
    }
  };

  return (
    <div className={mainStyles.container}>
      <Header data={data} taskNumber={taskNumber} description={taskTitle} />
      <main className={mainStyles.main}>
        <div className={styles.alignInfo}>
          <div className={styles.expandInfo}>
            <Expand
              DescriptionTitle="Oppgavebeskrivelse"
              Description={taskDescription}
            />
            <Expand
              DescriptionTitle="Sensorveiledning"
              Description={markersGuideDescription}
            />
            <ConsistencyBox />
          </div>
          <div className={styles.grid}>
            <div className={styles.sortAndToggle}>
              <Sortingbox
                answers={answers}
                sortingAlgorithm={sortingAlgorithm}
                setSortingAlgorithm={setSortingAlgorithm}
              />
              <Togglebuttons
                value={maxItemsPerPage}
                handleSetMaxItems={handleSetMaxItems}
              />
            </div>
            {assessments
              .slice(
                currentPage * maxItemsPerPage - maxItemsPerPage,
                currentPage * maxItemsPerPage
              )
              .map((assessment: AssessmentType) => (
                <Textbox
                  key={assessment.assessmentId}
                  assessment={assessment}
                  setAssessmentScore={setAssessmentScore}
                  toggleFlag={toggleFlag}
                />
              ))}
          </div>
        </div>
      </main>

      <div className={styles.footer}>
        {currentPage > 1 ? (
          <div className={styles.upArrow} onClick={() => changePage('back')} />
        ) : null}
        {assessments.length - 1 >= currentPage * maxItemsPerPage ? (
          <div
            className={styles.downArrow}
            onClick={() => changePage('next')}
          />
        ) : null}
        {currentPage * maxItemsPerPage >= assessments.length ? (
          <Link
            href={{
              pathname: '/approval',
              query: { task: taskNumber },
            }}
            passHref
          >
            <Button
              variant="contained"
              onClick={() => saveBatch(assessments.slice(startIndexBatch, endIndexBatch), taskNumber)}
            >
              {/*need to figure out a key, currently set to 0*/}
              Fullfør
            </Button>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Assessment;
