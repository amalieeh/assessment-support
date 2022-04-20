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
  checkScores,
  chooseCorrelatedAssessment,
  getApprovedAssessments,
  getAssessmentData,
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
import Tooltip from '@mui/material/Tooltip';
import ProgressBar from '../components/progressbar';

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
  const [maxItems, setMaxItems] = useState<string>('4');
  const maxItemsPerPage = parseInt(maxItems);
  const [sortingAlgorithm, setSortingAlgorithm] = useState<string>('length_hl');

  const taskDescription: string =
    'Variabler med nøkkelordet var er globale, mens varibler med nøkkelordet let har et local scope eller blokk scope som vil si at de kun defineres for deler av koden om de defineres inni en kodeblokk.';
  const markersGuideDescription: string =
    'let - block scope. Dersom variabelen blir deklarert med let i en funksjon, er den bare tilgjengelig i funksjonen. var - global scope Dersom variabelen blir deklarert med var, blir den tilgjengelig i all kode. Kan by på problemer når vi gir variabler samme navn.';
  const maxReAssessmentPercentage = 0.2;

  const assessmentData = getAssessmentData(taskNumber);
  const numberOfAnswers = assessmentData.length;

  const [assessments, setAssessments] =
    useState<AssessmentType[]>(assessmentData);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  const startIndexBatch = currentPage * maxItemsPerPage - maxItemsPerPage;
  const endIndexBatch = currentPage * maxItemsPerPage;

  useEffect(() => {
    sortAnswers(assessmentData, sortingAlgorithm);
    setAssessments(
      assessmentData.map((answer: AnswerType) => ({
        score: '',
        isFlagged: false,
        ...answer,
      }))
    );
  }, [sortingAlgorithm]);

  // to make sure setAssessments is being set, otherwise it is empty
  useEffect(() => {
    if (assessments.length == 0) {
      setAssessments(assessmentData);
      findAndSetCurrentPage(assessmentData, maxItemsPerPage);
    }
  }, [assessments.length, assessmentData]);

  const changePage = (direction: string): void => {
    if (direction == 'back') {
      setCurrentPage(currentPage - 1);
    } else if (direction == 'next') {
      appendReAssessments(assessments.slice(startIndexBatch, endIndexBatch), maxReAssessmentPercentage);
      saveBatch(assessments.slice(startIndexBatch, endIndexBatch), taskNumber);
      setCurrentPage(currentPage + 1);
      setProgressPercentage(endIndexBatch / (numberOfAnswers * (1 + maxReAssessmentPercentage)));
    }
  };

  const appendReAssessments = (batch: AssessmentType[], maxReAssessmentPercentage: number) => {
    // prevent the re of getting re-added and saved with a new id when it was already approved
    const approvedAssessments = getApprovedAssessments(taskNumber);
    if (approvedAssessments.length > 0) {
      return;
    }
    // if an outlier was returned and the reAssessment-list is not full (over 20%), then append (if it is not there already)
    if (
      // not currently assessing a reAssessment
      currentPage * (maxItemsPerPage - 1) <
      numberOfAnswers
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
    percentage: number | string
  ) => {
    let newScore: number | string = percentage;
    typeof percentage == 'number'
      ? (newScore = percentage * assessment.maxPoints)
      : null;
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

  const toggleFlag = (assessment: AssessmentType) => {
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
      findAndSetCurrentPage(assessments, parseInt(value));
    }
  };

  const findAndSetCurrentPage = (
    assessments: AssessmentType[],
    value: number
  ) => {
    const numberOfAssessedAssessments = assessments.filter(
      (assessment) => assessment.score !== ''
    ).length;
    const currentPage = Math.ceil(numberOfAssessedAssessments / value + 0.01);
    setCurrentPage(currentPage);
  };

  return (
    <div className={mainStyles.container}>
      <Header
        data={data}
        taskNumber={taskNumber}
        description={taskTitle}
        goBackPage="task"
      />
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
                answers={assessmentData}
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
          checkScores(assessments) == true ? (
            <Link
              href={{
                pathname: '/approval',
                query: { task: taskNumber },
              }}
              passHref
            >
              <Button
                sx={{ textTransform: 'none' }}
                variant="contained"
                onClick={() =>
                  saveBatch(
                    assessments.slice(startIndexBatch, endIndexBatch),
                    taskNumber
                  )
                }
              >
                Fullfør vurderingen av oppgave {taskNumber}
              </Button>
            </Link>
          ) : (
            <Tooltip
              title={
                <h3>
                  Det må settes poeng på alle besvarelsene for å fullføre
                  vurderingen av oppgavesettet.
                </h3>
              }
            >
              <span>
                <Button
                  disabled
                  sx={{ textTransform: 'none' }}
                  variant="contained"
                  onClick={() =>
                    saveBatch(
                      assessments.slice(startIndexBatch, endIndexBatch),
                      taskNumber
                    )
                  }
                >
                  Fullfør vurderingen av oppgave {taskNumber}
                </Button>
              </span>
            </Tooltip>
          )
        ) : null}
      </div>
      <ProgressBar percentage={progressPercentage} />
    </div>
  );
};

export default Assessment;
